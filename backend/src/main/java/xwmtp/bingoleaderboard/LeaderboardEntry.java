package xwmtp.bingoleaderboard;

import xwmtp.bingoleaderboard.data.Player;
import xwmtp.bingoleaderboard.data.Result;

import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static xwmtp.bingoleaderboard.DurationsUtil.formatDuration;

public class LeaderboardEntry {

    private int rank;
    private final String playerName;
    private final int racetimePoints;
    private final int leaderboardScore;
    private final String leaderboardTime;
    private final String effectiveMedian;
    private final String average;
    private final String lastRaced;
    private final int finishedRacesCount;
    private final int includedRacesCount;

    public LeaderboardEntry(String playerName, int points, int leaderboardScore, String leaderboardTime,
                            String effectiveMedian, String average, String lastRaced,
                            int finishedRacesCount, int includedRacesCount) {
        this.playerName = playerName;
        this.racetimePoints = points;
        this.leaderboardScore = leaderboardScore;
        this.leaderboardTime = leaderboardTime;
        this.effectiveMedian = effectiveMedian;
        this.average = average;
        this.lastRaced = lastRaced;
        this.finishedRacesCount = finishedRacesCount;
        this.includedRacesCount = includedRacesCount;
    }

    public static LeaderboardEntryBuilder builder(int dropResults) {
        return new LeaderboardEntryBuilder(dropResults);
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

    public static class LeaderboardEntryBuilder {
        private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)
                .withLocale(Locale.US)
                .withZone(ZoneId.of("UTC"));
        private final int DROP_RESULTS;

        public LeaderboardEntryBuilder(int dropResults) {
            DROP_RESULTS = dropResults;
        }

        public LeaderboardEntry buildLeaderboardEntry(Player player) {
            List<Result> results = player.getResults();
            return new LeaderboardEntry(
                    player.getName(),
                    player.getPoints(),
                    leaderboardScore(results),
                    formatDuration(leaderboardTime(results)),
                    formatDuration(effectiveMedian(results)),
                    formatDuration(average(results)),
                    dateFormatter.format(lastRaced(results)),
                    player.getFinishedRacesCount(),
                    results.size()
            );
        }

        private int leaderboardScore(List<Result> results) {
            Duration leaderboardTime = leaderboardTime(results);
            long seconds = leaderboardTime.getSeconds();
            double scaled = (double) seconds / 6900 - 13.0 / 23.0; // 1:05 -> 0, 3:00 -> 1
            double sigmoided = 2 / (1 + Math.exp(4 * scaled));
            return (int) Math.round(sigmoided * 1000);
        }

        private Duration leaderboardTime(List<Result> results) {

            final List<Result> topResults = dropWorstRaces(results);
            final Duration forfeitTime = forfeitTime(topResults);
            final List<Duration> times = topResults.stream()
                    .map(r -> r.isForfeit() ? forfeitTime : r.timePenalizedByAge())
                    .collect(Collectors.toList());
            return DurationsUtil.average(times);
        }

        private Duration average(List<Result> results) {
            final List<Duration> times = results.stream()
                    .filter(r -> !r.isForfeit())
                    .map(Result::getTime)
                    .collect(Collectors.toList());
            return DurationsUtil.average(times);
        }

        private Duration effectiveMedian(List<Result> results) {
            final List<Duration> finishedTimes = finishedTimes(results);
            final Duration worstTime = Collections.max(finishedTimes);
            final List<Duration> timesWithReplacedForfeits = results.stream()
                    .map(r -> r.isForfeit() ? worstTime : r.getTime())
                    .collect(Collectors.toList());
            return DurationsUtil.median(timesWithReplacedForfeits);
        }

        private Instant lastRaced(List<Result> results) {
            final List<Instant> raceDates = results.stream()
                    .map(Result::getDate)
                    .collect(Collectors.toList());
            return Collections.max(raceDates);
        }

        private Duration forfeitTime(List<Result> results) {
            final List<Duration> finishedTimes = finishedTimes(results);
            final Duration finishedAverage = DurationsUtil.average(finishedTimes);
            if (finishedTimes.size() == 0) {
                return finishedAverage;
            }
            final Duration worstTime = Collections.max(finishedTimes);
            final Duration penalizedAverage = finishedAverage.multipliedBy(12).dividedBy(10); // multiply by 1.2
            final Duration penalizedWorstTime = worstTime.multipliedBy(11).dividedBy(10); // multiply by 1.1
            return Collections.max(List.of(penalizedAverage, penalizedWorstTime));

        }

        private List<Result> dropWorstRaces(List<Result> results) {
            return results.stream()
                    .sorted(Comparator.comparing(Result::getTime))
                    .limit(Math.max(results.size() - DROP_RESULTS, DROP_RESULTS))
                    .collect(Collectors.toList());
        }

        private List<Duration> finishedTimes(List<Result> results) {
            return results.stream()
                    .filter(r -> !r.isForfeit())
                    .map(Result::getTime)
                    .collect(Collectors.toList());
        }
    }
}
