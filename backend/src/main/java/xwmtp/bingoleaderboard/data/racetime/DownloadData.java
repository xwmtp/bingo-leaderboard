package xwmtp.bingoleaderboard.data.racetime;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
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

@Component
public class DownloadData {
    private static final Logger logger = LoggerFactory.getLogger(DownloadData.class);
    private final HttpClient client = HttpClient.newHttpClient();
    private final JsonDeserializer<Instant> instantDeserializer = (json, typeOfT, context) -> Instant.parse(json.getAsString());
    private final JsonDeserializer<Duration> durationDeserializer = (json, typeOfT, context) ->  Duration.parse(json.getAsString()) ;
    private final Gson gson = new GsonBuilder()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .registerTypeAdapter(Instant.class, instantDeserializer)
            .registerTypeAdapter(Duration.class, durationDeserializer)
            .create();

    public List<Player> downloadPlayers(int maxResults, int limit) {
        RacetimeLeaderboard leaderboard = downloadRacetimeLeaderboard();
        if (limit < 0) {
            limit = leaderboard.getRankings().size();
        }
        List<Player> players = new ArrayList<>();
        List<RacetimeRanking> rankings = leaderboard.getRankings().stream()
                .limit(limit)
                .toList();
        for (RacetimeRanking ranking : rankings) {
            if (ranking.getUser() == null) {
                continue;
            }
            logger.trace("Downloading player {}...", ranking.getUser().getName());
            List<Result> results = downloadRacetimeResults(ranking, maxResults);
            logger.trace("Downloaded ({}) times: {} ", results.size(), results.stream().map(r-> Durations.formatDuration(r.getTime())).collect(Collectors.toList()));
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
                    .toList();
            results.addAll(newResults);
            page++;
        } while (page <= numPages && results.size() < maxResults && results.size() < ranking.getTimesRaced());
        return results.stream()
                .limit(maxResults)
                .collect(Collectors.toList());
    }


    private RacetimeRacesPage downloadRacetimeRacesPage(String userId, int page) {
        try {
            String racetimeRacesData = getRequest("https://racetime.gg/user/" + userId + "/races/data?show_entrants=true&per_page=25&page=" + page);

            return gson.fromJson(racetimeRacesData, RacetimeRacesPage.class);
        } catch (IOException | InterruptedException e) {
            logger.error("While retrieving Racetime data for player with id {}", userId, e);
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
            logger.error("While retrieving Racetime leaderboard data, returning empty leaderboard:", e);
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

        logger.trace(uri);
        if (response.statusCode() == 200) {
            return response.body();
        } else {
            logger.error("Unsuccessful API request for {} (status {}: {})", uri, response.statusCode(), response.body());
            return "{}";
        }
    }
}
