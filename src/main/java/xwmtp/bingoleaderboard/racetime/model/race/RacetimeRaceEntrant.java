package xwmtp.bingoleaderboard.racetime.model.race;

import xwmtp.bingoleaderboard.racetime.model.RacetimeUser;

import java.time.Duration;

import static xwmtp.bingoleaderboard.racetime.model.race.RacetimeEntrantStatus.RacetimeEntrantStatusOption.*;

public class RacetimeRaceEntrant {

    private RacetimeUser user = new RacetimeUser();
    private Duration finishTime = null;
    private RacetimeEntrantStatus status = new RacetimeEntrantStatus();

    public RacetimeUser getUser() {
        return user;
    }

    public Duration getFinishTime() {
        return finishTime;
    }

    public RacetimeEntrantStatus getStatus() {
        return status;
    }

    public boolean hasValidFinish() {
        return status.getValue() == done || status.getValue() == dnf;
    }
}
