package xwmtp.bingoleaderboard.leaderboard;

import java.time.Instant;
import java.util.List;

public class Leaderboard {
    private final Instant lastUpdated;
    private final int numEntries;
    private final List<LeaderboardEntry> entries;

    public Leaderboard(List<LeaderboardEntry> entries) {
        for (int i = 0; i < entries.size(); i++) {
            entries.get(i).setRank(i + 1);
        }
        this.entries = entries;
        numEntries = entries.size();
        lastUpdated = Instant.now();
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        entries.forEach(entry -> string.append(entry.getRank()).append(" ").append(entry.toString()).append("\n"));
        return string.toString();
    }

    public Instant getLastUpdated() {
        return lastUpdated;
    }

    public int getNumEntries() {
        return numEntries;
    }

    public List<LeaderboardEntry> getEntries() {
        return entries;
    }
}
