package xwmtp.bingoleaderboard.leaderboard;

import xwmtp.bingoleaderboard.data.Player;

@FunctionalInterface
public interface LeaderboardEntryCreator {

    LeaderboardEntry create(Player player, int dropResults);

}
