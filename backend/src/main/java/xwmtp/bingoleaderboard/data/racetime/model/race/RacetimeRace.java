package xwmtp.bingoleaderboard.data.racetime.model.race;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RacetimeRace {

    private String name = "";
    private String info = "";
    private Instant endedAt = null;
    private RacetimeRaceGoal goal = new RacetimeRaceGoal();
    private boolean recorded = false;
    private List<RacetimeRaceEntrant> entrants = new ArrayList<>();
    private transient Pattern bingoGoalPattern = Pattern.compile("https://ootbingo\\.github\\.io/bingo/((?:v|beta)\\d+(?:\\.\\d+)*(?:-[A-Za-z]*)?)/bingo\\.html\\?(?:seed=\\d+&mode=normal|mode=normal+&seed=\\d+)");

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Instant getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(Instant endedAt) {
        this.endedAt = endedAt;
    }

    public RacetimeRaceGoal getGoal() {
        return goal;
    }

    public void setGoal(RacetimeRaceGoal goal) {
        this.goal = goal;
    }

    public boolean isRecorded() {
        return recorded;
    }

    public void setRecorded(boolean recorded) {
        this.recorded = recorded;
    }

    public List<RacetimeRaceEntrant> getEntrants() {
        return entrants;
    }

    public void setEntrants(List<RacetimeRaceEntrant> entrants) {
        this.entrants = entrants;
    }

    public Pattern getBingoGoalPattern() {
        return bingoGoalPattern;
    }

    public void setBingoGoalPattern(Pattern bingoGoalPattern) {
        this.bingoGoalPattern = bingoGoalPattern;
    }

    @Override
    public String toString() {
        return "RacetimeRace{" +
                "name='" + name + '\'' +
                ", info='" + info + '\'' +
                ", endedAt=" + endedAt +
                ", goal=" + goal +
                ", recorded=" + recorded +
                ", entrants=" + entrants +
                '}';
    }

    public boolean isValidBingoResultFor(String playerId) {
        boolean playerFinished = entrants.stream()
                .filter(s -> s.getUser().getId().equalsIgnoreCase(playerId))
                .findFirst()
                .filter(RacetimeRaceEntrant::hasValidFinish)
                .isPresent();
        return playerFinished && isValidBingoRace();
    }

    public boolean isValidBingoRace() {
        if (!name.startsWith("oot/") || !goal.getName().equals("Bingo") || goal.isCustom() || !recorded) {
            return false;
        }
        List<String> nonModes = List.of("short", "long", "blackout", "black out", "3x3", "4x4", "anti", "double", "bufferless", "child", "jp", "japanese", "bingo-j");
        for (String nonMode : nonModes) {
            if (goal.getName().toLowerCase().contains(nonMode)) {
                return false;
            }
        }
        Matcher m = bingoGoalPattern.matcher(info);
        return m.matches();
    }
}
