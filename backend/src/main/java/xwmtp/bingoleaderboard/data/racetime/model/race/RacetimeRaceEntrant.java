package xwmtp.bingoleaderboard.data.racetime.model.race;

import xwmtp.bingoleaderboard.data.racetime.model.RacetimeUser;

import java.time.Duration;

import static xwmtp.bingoleaderboard.data.racetime.model.race.RacetimeEntrantStatus.RacetimeEntrantStatusOption.*;

public class RacetimeRaceEntrant {

    private RacetimeUser user = new RacetimeUser();
    private Duration finishTime = null;
    private RacetimeEntrantStatus status = new RacetimeEntrantStatus();
    private String comment = "";

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

    public String getComment() {
        return comment;
    }
}
