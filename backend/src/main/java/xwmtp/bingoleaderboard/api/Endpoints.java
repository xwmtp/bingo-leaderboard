package xwmtp.bingoleaderboard.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xwmtp.bingoleaderboard.Leaderboard;
import xwmtp.bingoleaderboard.LeaderboardEntry;

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

    @RequestMapping("/api")
    public String index() {
        return "Bingo Leaderboard backend";
    }

    @RequestMapping("api/leaderboard")
    public List<LeaderboardEntry> leaderboard() {
        return leaderboard.getLeaderboard();
    }
}
