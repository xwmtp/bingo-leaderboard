package xwmtp.bingoleaderboard.data.racetime.model.race;

import java.util.ArrayList;
import java.util.List;

public class RacetimeRacesPage {

    private final List<RacetimeRace> races = new ArrayList<>();
    private int numPages = 0;

    public int getNumPages() {
        return numPages;
    }

    public List<RacetimeRace> getRaces() {
        return races;
    }
}
