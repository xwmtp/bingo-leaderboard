package xwmtp.bingoleaderboard;

import xwmtp.bingoleaderboard.racetime.model.leaderboard.RacetimeRanking;

import java.util.List;
import java.util.stream.Collectors;

public class Player {

    private final String name;
    private final int points;
    private final List<Result> results;
    private final int finishedRacesCount;

    public Player(RacetimeRanking ranking, List<Result> results) {
        name = ranking.getUser().getName();
        points = ranking.getScore();
        this.results = results;
        finishedRacesCount = (int) results.stream()
                .filter(r -> !r.isForfeit())
                .count();
    }

    public String getName() {
        return name;
    }

    public int getPoints() {
        return points;
    }

    public List<Result> getResults() {
        return results;
    }

    public int getFinishedRacesCount() {
        return finishedRacesCount;
    }
}
