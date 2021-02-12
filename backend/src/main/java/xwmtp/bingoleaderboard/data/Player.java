package xwmtp.bingoleaderboard.data;

import xwmtp.bingoleaderboard.data.racetime.model.leaderboard.RacetimeRanking;
import xwmtp.bingoleaderboard.util.Durations;

import java.time.Duration;
import java.time.Instant;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Player {

    private final String name;
    private final String id;
    private final int points;
    private final List<Result> results;
    private final int finishedRacesCount;
    private final Duration forfeitTime;

    public Player(RacetimeRanking ranking, List<Result> results) {
        name = ranking.getUser().getName();
        id = ranking.getUser().getId();
        points = ranking.getScore();
        this.results = results;
        finishedRacesCount = (int) results.stream()
                .filter(r -> !r.isForfeit())
                .count();
        forfeitTime = forfeitTime(results);
    }

    public int leaderboardScore(int dropResults) {
        Duration leaderboardTime = leaderboardTime(dropResults);
        long seconds = leaderboardTime.getSeconds();
        double scaled = (double) seconds / 6900 - 13.0 / 23.0; // 1:05 -> 0, 3:00 -> 1
        double sigmoided = 2 / (1 + Math.exp(4 * scaled));
        return (int) Math.round(sigmoided * 1000);
    }

    public Duration leaderboardTime(int dropResults) {
        final List<Duration> times = results.stream()
                .sorted(Comparator.comparing(Result::timePenalizedByAge))
                .limit(racesLimit(dropResults))
                .map(r -> r.isForfeit() ? forfeitTime : r.timePenalizedByAge())
                .collect(Collectors.toList());
        return Durations.average(times);
    }

    public Duration average() {
        final List<Duration> times = results.stream()
                .filter(r -> !r.isForfeit())
                .map(Result::getTime)
                .collect(Collectors.toList());
        return Durations.average(times);
    }

    public Duration effectiveAverage(int dropResults) {
        final List<Duration> times = results.stream()
                .sorted(Comparator.comparing(Result::timePenalizedByAge))
                .limit(racesLimit(dropResults))
                .map(r -> r.isForfeit() ? forfeitTime : r.getTime())
                .collect(Collectors.toList());
        return Durations.average(times);
    }

    public Duration effectiveMedian() {
        final List<Duration> finishedTimes = finishedTimes(results);
        final Duration worstTime = Collections.max(finishedTimes);
        final List<Duration> timesWithReplacedForfeits = results.stream()
                .map(r -> r.isForfeit() ? worstTime : r.getTime())
                .collect(Collectors.toList());
        return Durations.median(timesWithReplacedForfeits);
    }

    public Instant lastRaced() {
        final List<Instant> raceDates = results.stream()
                .map(Result::getDate)
                .collect(Collectors.toList());
        return Collections.max(raceDates);
    }

    private Duration forfeitTime(List<Result> results) {
        final List<Duration> finishedTimes = finishedTimes(results);
        final Duration finishedAverage = Durations.average(finishedTimes);
        if (finishedTimes.size() == 0) {
            return finishedAverage;
        }
        final Duration penalizedAverage = finishedAverage.multipliedBy(12).dividedBy(10); // multiply by 1.2
        final Duration worstTime = Collections.max(finishedTimes);
        final Duration penalizedWorstTime = worstTime.multipliedBy(11).dividedBy(10); // multiply by 1.1
        return Collections.max(List.of(penalizedAverage, penalizedWorstTime));
    }

    public int racesLimit(int dropResults) {
        return Math.max(results.size() - dropResults, dropResults);
    }

    private List<Duration> finishedTimes(List<Result> results) {
        return results.stream()
                .filter(r -> !r.isForfeit())
                .map(Result::getTime)
                .collect(Collectors.toList());
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public int getPoints() {
        return points;
    }

    public List<Result> getResults() {
        return results;
    }

    public int getFinishedRacesCount() {
        return finishedRacesCount;
    }
}
