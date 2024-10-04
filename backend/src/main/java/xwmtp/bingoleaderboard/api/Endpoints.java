package xwmtp.bingoleaderboard.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import xwmtp.bingoleaderboard.leaderboard.Leaderboard;
import xwmtp.bingoleaderboard.leaderboard.LeaderboardManager;
import xwmtp.bingoleaderboard.leaderboard.LeaderboardPlayer;

import java.util.List;

@RestController
public class Endpoints {
    private final LeaderboardManager leaderboardManager;

    public Endpoints(LeaderboardManager leaderboardManager) {
        this.leaderboardManager = leaderboardManager;
    }

    @GetMapping("/api")
    public String index() {
        return "Bingo Leaderboard backend";
    }

    @GetMapping("api/leaderboard")
    public Leaderboard leaderboard() {
        return leaderboardManager.getLeaderboard();
    }

    @GetMapping("api/players")
    public List<LeaderboardPlayer> players() {
        return leaderboardManager.getPlayers();
    }

    @GetMapping("api/players/{name}")
    public LeaderboardPlayer player(@PathVariable("name") String name) {
        return leaderboardManager.getPlayers().stream()
                .filter(e -> e.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
    }
}

