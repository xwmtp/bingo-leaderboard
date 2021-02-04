package xwmtp.bingoleaderboard.leaderboard;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import xwmtp.bingoleaderboard.data.Player;
import xwmtp.bingoleaderboard.data.racetime.DownloadData;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class Leaderboard {
    private static final Logger logger = LoggerFactory.getLogger(Leaderboard.class);
    private static final int MAX_RESULTS = 15;
    private static final int DROP_RESULTS = 3;
    private final DownloadData downloadData = new DownloadData();
    private List<LeaderboardPlayer> players = new ArrayList<>();
    private List<LeaderboardEntry> leaderboard = new ArrayList<>();

    @PostConstruct
    public void constructLeaderboard() {
        List<Player> downloadedPlayers = downloadData.downloadPlayers(MAX_RESULTS, 3);
        players = downloadedPlayers.stream()
                .filter(p -> p.getFinishedRacesCount() > 0)
                .map(p -> new LeaderboardPlayer(p, new LeaderboardEntry(p, DROP_RESULTS), DROP_RESULTS))
                .collect(Collectors.toList());
        leaderboard = players.stream()
                .map(LeaderboardPlayer::getLeaderboardEntry)
                .sorted(Comparator.comparing(LeaderboardEntry::getLeaderboardTime))
                .collect(Collectors.toList());
        for (int i = 0; i < leaderboard.size(); i++) {
            leaderboard.get(i).setRank(i + 1);
        }
    }

    @Scheduled(cron = "0 0 9 * * ?", zone="UTC")
    public void update() {
        logger.info("Updating leaderboard...");
        constructLeaderboard();
        logger.info("Updating leaderboard...");
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
        if (leaderboard.isEmpty()) {
            constructLeaderboard();
        }
        return leaderboard;
    }

    public List<LeaderboardPlayer> getPlayers() {
        if (players.isEmpty()) {
            constructLeaderboard();
        }
        return players;
    }
}
