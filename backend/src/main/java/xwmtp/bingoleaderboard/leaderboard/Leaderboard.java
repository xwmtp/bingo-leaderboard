package xwmtp.bingoleaderboard.leaderboard;

import xwmtp.bingoleaderboard.data.Player;
import xwmtp.bingoleaderboard.data.racetime.DownloadData;

import java.util.*;
import java.util.stream.Collectors;

public class Leaderboard {
    private final DownloadData downloadData = new DownloadData();
    private List<LeaderboardPlayer> players = new ArrayList<>();
    private List<LeaderboardEntry> leaderboard = new ArrayList<>();

    public void constructLeaderboard(int maxResults, int dropResults) {
        List<Player> downloadedPlayers = downloadData.downloadPlayers(maxResults, 20);
        System.out.println(DownloadData.getApiCalls() + " api calls made.");
        players = downloadedPlayers.stream()
                .map(p -> new LeaderboardPlayer(p, new LeaderboardEntry(p, dropResults), dropResults))
                .collect(Collectors.toList());
        leaderboard = players.stream()
                .map(LeaderboardPlayer::getLeaderboardEntry)
                .filter(p -> p.getFinishedRacesCount() > 0)
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

    public List<LeaderboardPlayer> getPlayers() {
        return players;
    }
}
