package xwmtp.bingoleaderboard;

import xwmtp.bingoleaderboard.racetime.DownloadData;

import java.util.*;
import java.util.stream.Collectors;

public class Leaderboard {
    private final DownloadData downloadData = new DownloadData();
    private List<LeaderboardEntry> leaderboard = new ArrayList<>();

    public void constructLeaderboard(int maxResults, int dropResults) {
        List<Player> players = downloadData.downloadPlayers(maxResults);
        System.out.println(downloadData.apiCalls + " api calls!");
        final LeaderboardEntry.LeaderboardEntryBuilder entryBuilder = LeaderboardEntry.builder(dropResults);
        leaderboard = players.stream()
                .filter(r -> r.getFinishedRacesCount() > 0)
                .map(entryBuilder::buildLeaderboardEntry)
                .sorted(Comparator.comparing(LeaderboardEntry::getLeaderboardTime))
                .collect(Collectors.toList());
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        for(int i = 0; i < leaderboard.size(); i++) {
            string.append(i + 1).append(" ").append(leaderboard.get(i).toString()).append("\n");
        }
        return string.toString();
    }
}
