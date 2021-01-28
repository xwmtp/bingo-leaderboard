package xwmtp.bingoleaderboard.data.racetime.model.leaderboard;

import java.util.ArrayList;
import java.util.List;

public class RacetimeLeaderboardPage {
    private List<RacetimeLeaderboard> leaderboards = new ArrayList<>();

    public List<RacetimeLeaderboard> leaderboards() {
        return leaderboards;
    }

    public String toString() {
        return leaderboards.toString();
    }
}
