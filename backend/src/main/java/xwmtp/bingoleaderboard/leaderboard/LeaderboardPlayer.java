package xwmtp.bingoleaderboard.leaderboard;

import xwmtp.bingoleaderboard.data.Player;
import xwmtp.bingoleaderboard.data.Result;
import xwmtp.bingoleaderboard.util.Durations;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class LeaderboardPlayer {
    private final String name;
    private final String id;
    private final LeaderboardEntry leaderboardEntry;
    private final List<LeaderboardResult> results;

    public LeaderboardPlayer(Player player, LeaderboardEntry entry, int dropResults) {
        name = player.getName();
        id = player.getId();
        leaderboardEntry = entry;
        int numConsidered = player.racesLimit(dropResults);
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

    public String getId() {
        return id;
    }

    public List<LeaderboardResult> getResults() {
        return results;
    }

    public LeaderboardEntry getLeaderboardEntry() {
        return leaderboardEntry;
    }
}
