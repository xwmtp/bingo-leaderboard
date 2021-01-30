package xwmtp.bingoleaderboard.leaderboard;

import xwmtp.bingoleaderboard.data.Player;

import static xwmtp.bingoleaderboard.util.Date.formatDate;
import static xwmtp.bingoleaderboard.util.Durations.formatDuration;

public class LeaderboardEntry {

    private final String playerName;
    private final int racetimePoints;
    private final int leaderboardScore;
    private final String leaderboardTime;
    private final String effectiveMedian;
    private final String average;
    private final String lastRaced;
    private final int finishedRacesCount;
    private final int includedRacesCount;
    private int rank;

    public LeaderboardEntry(Player player, int dropResults) {

        playerName = player.getName();
        racetimePoints = player.getPoints();
        leaderboardScore = player.leaderboardScore(dropResults);
        leaderboardTime = formatDuration(player.leaderboardTime(dropResults));
        effectiveMedian = formatDuration(player.effectiveMedian());
        average = formatDuration(player.average());
        lastRaced = formatDate(player.lastRaced());
        finishedRacesCount = player.getFinishedRacesCount();
        includedRacesCount = player.getResults().size();
    }

    @Override
    public String toString() {
        return String.format("%s | %s | %s | %s | %s | %s | %s | %s/%s",
                playerName,
                leaderboardScore,
                leaderboardTime,
                effectiveMedian,
                average,
                racetimePoints,
                lastRaced,
                finishedRacesCount,
                includedRacesCount
        );
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public String getPlayerName() {
        return playerName;
    }

    public int getRacetimePoints() {
        return racetimePoints;
    }

    public String getLeaderboardTime() {
        return leaderboardTime;
    }

    public int getLeaderboardScore() {
        return leaderboardScore;
    }

    public String getEffectiveMedian() {
        return effectiveMedian;
    }

    public String getAverage() {
        return average;
    }

    public String getLastRaced() {
        return lastRaced;
    }

    public int getFinishedRacesCount() {
        return finishedRacesCount;
    }

    public int getIncludedRacesCount() {
        return includedRacesCount;
    }

}
