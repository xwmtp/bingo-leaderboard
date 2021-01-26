package xwmtp.bingoleaderboard.racetime.model.race;

public class RacetimeEntrantStatus {

    private RacetimeEntrantStatusOption value = null;

    public RacetimeEntrantStatusOption getValue() {
        return value;
    }

    public void setValue(RacetimeEntrantStatusOption value) {
        this.value = value;
    }

    public enum RacetimeEntrantStatusOption {
        requested, invited, declined, ready, not_ready, in_progress, done, dnf, dq
    }
}
