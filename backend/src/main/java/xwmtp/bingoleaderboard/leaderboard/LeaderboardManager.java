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
public class LeaderboardManager {
    private static final Logger logger = LoggerFactory.getLogger(LeaderboardManager.class);
    private static final int MAX_RESULTS = 15;
    private static final int DROP_RESULTS = 3;
    private final DownloadData downloadData;
    private final LeaderboardEntryCreator leaderboardEntryCreator;
    private List<LeaderboardPlayer> players = new ArrayList<>();
    private Leaderboard leaderboard;

    public LeaderboardManager(DownloadData downloadData, LeaderboardEntryCreator leaderboardEntryCreator) {
        this.downloadData = downloadData;
        this.leaderboardEntryCreator = leaderboardEntryCreator;
    }

    @PostConstruct
    public void constructLeaderboard() {
        List<Player> downloadedPlayers = downloadData.downloadPlayers(MAX_RESULTS);
        players = makeLeaderboardPlayers(downloadedPlayers);
        leaderboard = new Leaderboard(makeLeaderboardEntries(players));
    }

    List<LeaderboardPlayer> makeLeaderboardPlayers(List<Player> players) {
        return players.stream()
                .filter(p -> p.getFinishedRacesCount() > 0)
                .map(p -> new LeaderboardPlayer(p, leaderboardEntryCreator.create(p, DROP_RESULTS), DROP_RESULTS))
                .collect(Collectors.toList());
    }

    List<LeaderboardEntry> makeLeaderboardEntries(List<LeaderboardPlayer> players) {
        return players.stream()
                .map(LeaderboardPlayer::getLeaderboardEntry)
                .sorted(Comparator.comparing(LeaderboardEntry::getLeaderboardTime))
                .collect(Collectors.toList());
    }

    @Scheduled(cron = "0 0 9 * * ?", zone="UTC")
    public void update() {
        logger.info("Updating leaderboard...");
        constructLeaderboard();
        logger.info("Completed leaderboard update");
    }

    public Leaderboard getLeaderboard() {
        return leaderboard;
    }

    public List<LeaderboardPlayer> getPlayers() {
        return players;
    }
}
