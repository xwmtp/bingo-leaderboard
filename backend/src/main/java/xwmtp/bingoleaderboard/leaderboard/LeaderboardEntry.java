package xwmtp.bingoleaderboard.leaderboard;

import xwmtp.bingoleaderboard.data.Player;

import static xwmtp.bingoleaderboard.util.Durations.formatDuration;

public class LeaderboardEntry {

    private final String playerName;
    private final String playerId;
    private final int racetimePoints;
    private final int leaderboardScore;
    private final String leaderboardTime;
    private final String average;
    private final String effectiveAverage;
    private final String effectiveMedian;
    private final String lastRaced;
    private final int finishedRacesCount;
    private final int includedRacesCount;
    private final String finishedRacesFraction;
    private int rank;

    public LeaderboardEntry(Player player, int numDropped, int numMax) {

        playerName = player.getName();
        playerId = player.getId();
        racetimePoints = player.getPoints();
        leaderboardScore = player.leaderboardScore(numDropped, numMax);
        leaderboardTime = formatDuration(player.leaderboardTime(numDropped, numMax));
        effectiveMedian = formatDuration(player.effectiveMedian());
        average = formatDuration(player.average());
        effectiveAverage = formatDuration(player.effectiveAverage(numDropped, numMax));
        lastRaced = player.lastRaced().toString();
        finishedRacesCount = player.getFinishedRacesCount();
        includedRacesCount = player.getResults().size();
        finishedRacesFraction = String.format("%s/%s", finishedRacesCount, includedRacesCount);
    }

    @Override
    public String toString() {
        return String.format("%s | %s | %s | %s | %s | %s | %s | %s",
                playerName,
                leaderboardScore,
                leaderboardTime,
                effectiveMedian,
                average,
                racetimePoints,
                lastRaced,
                finishedRacesFraction
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

    public String getPlayerId() {
        return playerId;
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

    public String getEffectiveAverage() {return effectiveAverage;}

    public String getLastRaced() {
        return lastRaced;
    }

    public int getFinishedRacesCount() {
        return finishedRacesCount;
    }

    public int getIncludedRacesCount() {
        return includedRacesCount;
    }

    public String getFinishedRacesFraction() {
        return finishedRacesFraction;
    }

}
