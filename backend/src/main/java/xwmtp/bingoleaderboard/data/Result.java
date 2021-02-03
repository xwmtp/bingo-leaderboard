package xwmtp.bingoleaderboard.data;

import xwmtp.bingoleaderboard.data.racetime.model.race.RacetimeRace;
import xwmtp.bingoleaderboard.data.racetime.model.race.RacetimeRaceEntrant;

import java.time.Duration;
import java.time.Instant;

import static java.time.temporal.ChronoUnit.DAYS;
import static xwmtp.bingoleaderboard.data.racetime.model.race.RacetimeEntrantStatus.RacetimeEntrantStatusOption.dnf;

public class Result {
    private final String slug;
    private final String entrantName;
    private final String entrantId;
    private final Instant date;
    private final Duration time;
    private final boolean forfeit;
    private final String comment;

    public Result(RacetimeRace race, String userId) {
        RacetimeRaceEntrant entrant = race.getEntrants().stream()
                .filter(s -> s.getUser().getId().equalsIgnoreCase(userId))
                .findFirst()
                .orElse(null);
        if (entrant == null) {
            throw new IllegalArgumentException("User id " + userId + "not present in the entrants of race " + race.getName());
        }
        slug = race.getName();
        date = race.getEndedAt();
        time = entrant.getFinishTime();
        forfeit = entrant.getStatus().getValue() == dnf;
        entrantName = entrant.getUser().getName();
        entrantId = entrant.getUser().getId();
        comment = entrant.getComment();
    }

    public Duration timePenalizedByAge() {
        final int age = (int) Math.max(date.until(Instant.now(), DAYS), 0);
        final int penaltyFactor10000 = agePenaltyFactorx10000(age);
        return getTime().multipliedBy(penaltyFactor10000).dividedBy(10000);
    }

    private int agePenaltyFactorx10000(int days) {
        final double twoYearFactor = 1.2;
        final double threshold = 60.0;
        final double maxFactor = 1.2;
        final double TWO_YEARS = 730;

        final double base = 1 - (twoYearFactor - 1) * threshold / (TWO_YEARS - threshold);
        final double intercept = (twoYearFactor - 1) / (TWO_YEARS - threshold);
        double penaltyFactor = base + (double) days * intercept;

        penaltyFactor = Math.min(Math.max(penaltyFactor, 1), maxFactor);
        return (int) Math.round(penaltyFactor * 10000);
    }

    public String getSlug() {
        return slug;
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

    public String getComment() {
        return comment;
    }
}
