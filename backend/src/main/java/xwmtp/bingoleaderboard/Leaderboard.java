package xwmtp.bingoleaderboard;

import xwmtp.bingoleaderboard.racetime.DownloadData;

import java.util.*;
import java.util.stream.Collectors;

public class Leaderboard {
    private final DownloadData downloadData = new DownloadData();
    private List<LeaderboardEntry> leaderboard = new ArrayList<>();

    public void constructLeaderboard(int maxResults, int dropResults) {
        List<Player> players = downloadData.downloadPlayers(maxResults, -1);
        System.out.println(DownloadData.getApiCalls() + " api calls made.");
        final LeaderboardEntry.LeaderboardEntryBuilder entryBuilder = LeaderboardEntry.builder(dropResults);
        leaderboard = players.stream()
                .filter(r -> r.getFinishedRacesCount() > 0)
                .map(entryBuilder::buildLeaderboardEntry)
                .sorted(Comparator.comparing(LeaderboardEntry::getLeaderboardTime))
                .collect(Collectors.toList());
        for (int i = 0; i < leaderboard.size(); i++) {
            leaderboard.get(i).setRank(i + 1);
        }
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        for(int i = 0; i < leaderboard.size(); i++) {
            string.append(i + 1).append(" ").append(leaderboard.get(i).toString()).append("\n");
        }
        return string.toString();
    }

    public List<LeaderboardEntry> getLeaderboard() {
        return leaderboard;
    }
}
