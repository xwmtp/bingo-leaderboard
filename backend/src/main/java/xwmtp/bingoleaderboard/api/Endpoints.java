package xwmtp.bingoleaderboard.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import xwmtp.bingoleaderboard.leaderboard.Leaderboard;
import xwmtp.bingoleaderboard.leaderboard.LeaderboardEntry;
import xwmtp.bingoleaderboard.data.Player;
import xwmtp.bingoleaderboard.leaderboard.LeaderboardPlayer;

import java.util.List;

@RestController
public class Endpoints {
    private final Leaderboard leaderboard;

    public Endpoints(Leaderboard leaderboard) {
        this.leaderboard = leaderboard;
    }

    @GetMapping("/api")
    public String index() {
        return "Bingo Leaderboard backend";
    }

    @GetMapping("api/leaderboard")
    public List<LeaderboardEntry> leaderboard() {
        return leaderboard.getLeaderboard();
    }

    @GetMapping("api/players")
    public List<LeaderboardPlayer> players() {
        return leaderboard.getPlayers();
    }

    @GetMapping("api/players/{name}")
    public LeaderboardPlayer player(@PathVariable("name") String name) {
        LeaderboardPlayer player = leaderboard.getPlayers().stream()
                .filter(e -> e.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
        return player;
    }
}

