package xwmtp.bingoleaderboard.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import xwmtp.bingoleaderboard.Leaderboard;
import xwmtp.bingoleaderboard.LeaderboardEntry;
import xwmtp.bingoleaderboard.data.Player;

import java.util.List;

@RestController
public class Endpoints {
    private final Leaderboard leaderboard;

    public Endpoints() {
        final int maxResults = 15;
        final int dropResults = 3;
        leaderboard = new Leaderboard();
        //System.out.println(leaderboard);
        leaderboard.constructLeaderboard(maxResults, dropResults);
        //System.out.println(leaderboard);
    }

    @GetMapping("/api")
    public String index() {
        return "Bingo Leaderboard backend";
    }

    @GetMapping("api/leaderboard")
    public List<LeaderboardEntry> leaderboard() {
        return leaderboard.getLeaderboard();
    }

    @GetMapping("api/player/{name}")
    public Player player(@PathVariable("name") String name) {
        Player player = leaderboard.getPlayers().stream()
                .filter(e -> e.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
        return player;
    }
}

