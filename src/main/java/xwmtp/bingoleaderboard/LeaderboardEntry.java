package xwmtp.bingoleaderboard;

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
    private final String playerName;
    private final int points;
    private final int leaderboardScore;
    private final Duration leaderboardTime;
    private final Duration effectiveMedian;
    private final Duration average;
    private final Instant lastRaced;
    private final int finishedRacesCount;
    private final int includedRacesCount;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)
            .withLocale(Locale.US)
            .withZone(ZoneId.of("UTC"));


    public LeaderboardEntry(String playerName, int points, int leaderboardScore, Duration leaderboardTime,
                            Duration effectiveMedian, Duration average, Instant lastRaced,
                            int finishedRacesCount, int includedRacesCount) {
        this.playerName = playerName;
        this.points = points;
        this.leaderboardScore = leaderboardScore;
        this.leaderboardTime = leaderboardTime;
        this.effectiveMedian = effectiveMedian;
        this.average = average;
        this.lastRaced = lastRaced;
        this.finishedRacesCount = finishedRacesCount;
        this.includedRacesCount = includedRacesCount;
    }

    public Duration getLeaderboardTime() {
        return leaderboardTime;
    }

    @Override
    public String toString() {
        return String.format("%s | %s | %s | %s | %s | %s | %s | %s/%s",
                playerName,
                leaderboardScore,
                formatDuration(leaderboardTime),
                formatDuration(effectiveMedian),
                formatDuration(average),
                points,
                dateFormatter.format(lastRaced),
                finishedRacesCount,
                includedRacesCount
        );
    }

    public static LeaderboardEntryBuilder builder(int dropResults) {
        return new LeaderboardEntryBuilder(dropResults);
    }


    public static class LeaderboardEntryBuilder {
        private final int DROP_RESULTS;

        public LeaderboardEntryBuilder(int dropResults) {
            DROP_RESULTS = dropResults;
        }

        public LeaderboardEntry buildLeaderboardEntry(Player player) {
            List<Result> results = player.getResults();
            System.out.println(player.getName());
            System.out.println(results.stream().map(Result::getTime).collect(Collectors.toList()));
            return new LeaderboardEntry(
                    player.getName(),
                    player.getPoints(),
                    leaderboardScore(results),
                    leaderboardTime(results),
                    effectiveMedian(results),
                    average(results),
                    lastRaced(results),
                    player.getFinishedRacesCount(),
                    results.size()
                    );
        }

        private int leaderboardScore(List<Result> results) {
            Duration leaderboardTime = leaderboardTime(results);
            long seconds = leaderboardTime.getSeconds();
            double scaled0to1 = (double) seconds / 7200 - 0.5;
            double sigmoided = 2 / (1+Math.exp(4 * scaled0to1));
            return (int) Math.round(sigmoided * 1000);
        }

        private Duration leaderboardTime(List<Result> results) {

            final List<Result> topResults = dropWorstRaces(results);
            final Duration forfeitTime = forfeitTime(topResults);
            final List<Duration> times = topResults.stream()
                    .map(r -> r.isForfeit() ? forfeitTime : r.getTimePenalizedByAge())
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
