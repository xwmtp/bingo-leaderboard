package xwmtp.bingoleaderboard.leaderboard;

import xwmtp.bingoleaderboard.data.Player;
import xwmtp.bingoleaderboard.data.Result;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class LeaderboardPlayer {
    private final String name;
    private final List<LeaderboardResult> results;

    public LeaderboardPlayer(Player player, int dropResults) {
        name = player.getName();
        int numConsidered = Math.max(player.getResults().size() - dropResults, dropResults);
        List<Result> sortedResults = player.getResults().stream()
                .sorted(Comparator.comparing(Result::timePenalizedByAge))
                .collect(Collectors.toList());
        List<LeaderboardResult> resultsNonDropped = sortedResults.stream()
                .limit(numConsidered)
                .map(p -> new LeaderboardResult(p, false))
                .collect(Collectors.toList());
        List<LeaderboardResult> resultsDropped = sortedResults.stream()
                .skip(numConsidered)
                .map(p -> new LeaderboardResult(p, true))
                .collect(Collectors.toList());
        results = Stream.of(resultsNonDropped, resultsDropped).flatMap(Collection::stream).collect(Collectors.toList());
    }

    public String getName() {
        return name;
    }

    public List<LeaderboardResult> getResults() {
        return results;
    }
}
