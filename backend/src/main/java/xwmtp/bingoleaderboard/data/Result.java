package xwmtp.bingoleaderboard.data;

import xwmtp.bingoleaderboard.data.racetime.model.race.RacetimeRace;
import xwmtp.bingoleaderboard.data.racetime.model.race.RacetimeRaceEntrant;

import java.time.Duration;
import java.time.Instant;

import static java.time.temporal.ChronoUnit.DAYS;
import static xwmtp.bingoleaderboard.data.racetime.model.race.RacetimeEntrantStatus.RacetimeEntrantStatusOption.dnf;

public class Result {
    private final String entrantName;
    private final String entrantId;
    private final Instant date;
    private final Duration time;
    private final boolean forfeit;

    public Result(RacetimeRace race, String userId) {
        RacetimeRaceEntrant entrant = race.getEntrants().stream()
                .filter(s -> s.getUser().getId().equalsIgnoreCase(userId))
                .findFirst()
                .orElse(null);
        if (entrant == null) {
            throw new IllegalArgumentException("User id " + userId + "not present in the entrants of race " + race.getName());
        }
        date = race.getEndedAt();
        time = entrant.getFinishTime();
        forfeit = entrant.getStatus().getValue() == dnf;
        entrantName = entrant.getUser().getName();
        entrantId = entrant.getUser().getId();
    }

    public Duration timePenalizedByAge() {
        final int age = (int) Math.max(date.until(Instant.now(), DAYS), 0);
        final int penaltyFactor10000 = agePenaltyFactorx10000(age);
        return time.multipliedBy(penaltyFactor10000).dividedBy(10000);
    }

    private int agePenaltyFactorx10000(int days) {
        final double oneYearFactor = 1.1;
        final double threshold = 60.0;
        final double maxFactor = 1.2;

        final double base = 1 - (oneYearFactor - 1) * 30 / (365 - threshold);
        final double intercept = (oneYearFactor - 1) / (365 - threshold);
        double penaltyFactor = base + (double) days * intercept;

        penaltyFactor = Math.min(Math.max(penaltyFactor, 1), maxFactor);
        return (int) Math.round(penaltyFactor * 10000);
    }

    public String getEntrantName() {
        return entrantName;
    }

    public String getEntrantId() {
        return entrantId;
    }

    public Instant getDate() {
        return date;
    }

    public Duration getTime() {
        return time == null? Duration.ofHours(999) : time;
    }

    public boolean isForfeit() {
        return forfeit;
    }

}