package xwmtp.bingoleaderboard.data.racetime.model.leaderboard;

import xwmtp.bingoleaderboard.data.racetime.model.RacetimeUser;

public class RacetimeRanking {
    private int score = 0;
    private int timesRaced = 0;
    private RacetimeUser user = new RacetimeUser();

    public int getScore() {
        return score;
    }

    public int getTimesRaced() {
        return timesRaced;
    }

    public RacetimeUser getUser() {
        return user;
    }

    public String toString() {
        return "\n\nscore: " + score +
                "\ntimesRaced: " + timesRaced +
                "\nid: " + user.getId() +
                "\nname: " + user.getName();
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setTimesRaced(int timesRaced) {
        this.timesRaced = timesRaced;
    }

    public void setUser(RacetimeUser user) {
        this.user = user;
    }
}