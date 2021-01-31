package xwmtp.bingoleaderboard.leaderboard;

import xwmtp.bingoleaderboard.data.Result;
import xwmtp.bingoleaderboard.util.Date;
import xwmtp.bingoleaderboard.util.Durations;

public class LeaderboardResult {

    private final String slug;
    private final String time;
    private final String agedTime;
    private final boolean forfeit;
    private final String date;
    private final String comment;
    private final boolean dropped;

    public LeaderboardResult(Result result, boolean dropped) {
        slug = result.getSlug();
        date = Date.formatDate(result.getDate());
        forfeit = result.isForfeit();
        time = forfeit? "dnf" : Durations.formatDuration(result.getTime());
        agedTime = forfeit? "dnf" : Durations.formatDuration(result.timePenalizedByAge());
        comment = result.getComment();
        this.dropped = dropped;
    }

    public String getSlug() {
        return slug;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public String getAgedTime() {
        return agedTime;
    }

    public boolean isForfeit() {
        return forfeit;
    }

    public String getComment() {
        return comment;
    }

    public boolean isDropped() {
        return dropped;
    }
}
