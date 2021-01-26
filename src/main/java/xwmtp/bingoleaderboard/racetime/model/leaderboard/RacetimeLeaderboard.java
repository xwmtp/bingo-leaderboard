package xwmtp.bingoleaderboard.racetime.model.leaderboard;

import java.util.ArrayList;
import java.util.List;

public class RacetimeLeaderboard {

    private String goal = "";
    private List<RacetimeRanking> rankings = new ArrayList<>();

    public String getGoal() {
        return goal;
    }

    public List<RacetimeRanking> getRankings() {
        return rankings;
    }

    public String toString() {
        return "\ngoal: " + goal +
                "\nrankings: " + rankings;
    }


}