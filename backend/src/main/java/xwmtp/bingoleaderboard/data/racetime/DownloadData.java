package xwmtp.bingoleaderboard.data.racetime;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import xwmtp.bingoleaderboard.util.Durations;
import xwmtp.bingoleaderboard.data.Player;
import xwmtp.bingoleaderboard.data.Result;
import xwmtp.bingoleaderboard.data.racetime.model.leaderboard.RacetimeLeaderboard;
import xwmtp.bingoleaderboard.data.racetime.model.leaderboard.RacetimeLeaderboardPage;
import xwmtp.bingoleaderboard.data.racetime.model.leaderboard.RacetimeRanking;
import xwmtp.bingoleaderboard.data.racetime.model.race.RacetimeRacesPage;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class DownloadData {

    private final HttpClient client = HttpClient.newHttpClient();
    private final JsonDeserializer<Instant> instantDeserializer = (json, typeOfT, context) -> Instant.parse(json.getAsString());
    private final JsonDeserializer<Duration> durationDeserializer = (json, typeOfT, context) ->  Duration.parse(json.getAsString()) ;
    private final Gson gson = new GsonBuilder()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .registerTypeAdapter(Instant.class, instantDeserializer)
            .registerTypeAdapter(Duration.class, durationDeserializer)
            .create();
    private static int apiCalls = 0;

    public List<Player> downloadPlayers(int maxResults, int limit) {
        RacetimeLeaderboard leaderboard = downloadRacetimeLeaderboard();
        if (limit < 0) {
            limit = leaderboard.getRankings().size();
        }
        List<Player> players = new ArrayList<>();
        List<RacetimeRanking> rankings = leaderboard.getRankings().stream()
                .limit(limit)
                .collect(Collectors.toList());
        for (RacetimeRanking ranking : rankings) {
            System.out.println(ranking.getUser().getName());
            List<Result> results = downloadRacetimeResults(ranking, maxResults);
            System.out.println(results.stream().map(r-> Durations.formatDuration(r.getTime())).collect(Collectors.toList()));
            System.out.println(results.size() + "\n");
            players.add(new Player(ranking, results));
        }
        return players;
    }

    public List<Player> downloadPlayers(int maxResults) {
        return downloadPlayers(maxResults, -1);
    }

    private List<Result> downloadRacetimeResults(RacetimeRanking ranking, int maxResults) {
        String userId = ranking.getUser().getId();
        List<Result> results = new ArrayList<>();
        int page = 1;
        int numPages;
        List<Result> newResults;
        do {
            RacetimeRacesPage racesPage = downloadRacetimeRacesPage(userId, page);
            numPages = racesPage.getNumPages();
            newResults = racesPage.getRaces().stream()
                    .filter(r -> r.isValidBingoResultFor(userId))
                    .map(r -> new Result(r, userId))
                    .collect(Collectors.toList());
            results.addAll(newResults);
            page++;
        } while (page <= numPages && results.size() < maxResults && results.size() < ranking.getTimesRaced());
        return results.stream()
                .limit(maxResults)
                .collect(Collectors.toList());
    }


    private RacetimeRacesPage downloadRacetimeRacesPage(String userId, int page) {
        try {
            String racetimeRacesData = getRequest("https://racetime.gg/user/" + userId + "/races/data?show_entrants=true&page=" + page);

            RacetimeRacesPage racesPage = gson.fromJson(racetimeRacesData, RacetimeRacesPage.class);
            return racesPage;
        } catch (IOException | InterruptedException e) {
            System.out.println("Error: " + e);
            System.out.println("Couldn't download Racetime races for player with id " + userId + ".");
            return new RacetimeRacesPage() {
            };
        }
    }

    private RacetimeLeaderboard downloadRacetimeLeaderboard() {
        try {
            String racetimeLeaderboardData = getRequest("https://racetime.gg/oot/leaderboards/data");

            RacetimeLeaderboardPage leaderboardPage = gson.fromJson(racetimeLeaderboardData, RacetimeLeaderboardPage.class);
            return leaderboardPage.leaderboards().stream()
                    .filter(lb -> lb.getGoal().equals("Bingo"))
                    .findFirst()
                    .orElse(new RacetimeLeaderboard());
        } catch (IOException | InterruptedException e) {
            System.out.println("Error: " + e);
            System.out.println("Couldn't download Racetime leaderboard.");
            return new RacetimeLeaderboard();
        }
    }

    private String getRequest(String uri) throws IOException, InterruptedException {

        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create(uri))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(uri);
        if (response.statusCode() == 200) {
            apiCalls++;
            return response.body();
        } else {
            System.out.println("API request unsuccessful (status " + response.statusCode() + " : " + response.body() + ")");
            return "{}";
        }
    }

    public static int getApiCalls() {
        return apiCalls;
    }
}
