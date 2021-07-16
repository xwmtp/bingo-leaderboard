package xwmtp.bingoleaderboard.leaderboard;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import xwmtp.bingoleaderboard.data.Player;
import xwmtp.bingoleaderboard.data.racetime.DownloadData;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class LeaderboardManagerTest {

    private final DownloadData downloadDataMock = mock(DownloadData.class);
    private final LeaderboardManager leaderboardManager =
            new LeaderboardManager(downloadDataMock, (p, i, j) -> mock(LeaderboardEntry.class));

    @Test
    void makeLeaderboardPlayersFiltersOnFinishedRaceCount() {
        final List<Player> testPlayers = List.of(
                playerWithFinishedRaceCount("a", 5),
                playerWithFinishedRaceCount("b",0),
                playerWithFinishedRaceCount("c",1),
                playerWithFinishedRaceCount("d",100),
                playerWithFinishedRaceCount("e",0)
        );

        final List<String> ids = leaderboardManager.makeLeaderboardPlayers(testPlayers)
                .stream()
                .map(LeaderboardPlayer::getId)
                .collect(Collectors.toList());

        Assertions.assertThat(ids).containsExactly("a", "c", "d");
    }

    private Player playerWithFinishedRaceCount(String id, int races) {
        final Player player = mock(Player.class);
        when(player.getFinishedRacesCount()).thenReturn(races);
        when(player.getId()).thenReturn(id);
        return player;
    }

    @Test
    void makeLeaderboardEntriesSortsCorrectly() {
        final List<LeaderboardPlayer> testPlayers = List.of(
                LeaderboardPlayerWithLeaderboardTime("a", "1:14:21"),
                LeaderboardPlayerWithLeaderboardTime("b", "1:02:58"),
                LeaderboardPlayerWithLeaderboardTime("c", "0:00:00"),
                LeaderboardPlayerWithLeaderboardTime("d", "2:48:11"),
                LeaderboardPlayerWithLeaderboardTime("e", "1:37:02")
        );

        final List<String> ids = leaderboardManager.makeLeaderboardEntries(testPlayers)
                .stream()
                .map(LeaderboardEntry::getPlayerId)
                .collect(Collectors.toList());

        Assertions.assertThat(ids).containsExactly("c", "b", "a", "e", "d");

    }

    private LeaderboardPlayer LeaderboardPlayerWithLeaderboardTime(String id, String formattedLeaderboardTime) {
        final LeaderboardEntry leaderboardEntry = mock(LeaderboardEntry.class);
        when(leaderboardEntry.getLeaderboardTime()).thenReturn(formattedLeaderboardTime);
        when(leaderboardEntry.getPlayerId()).thenReturn(id);

        final LeaderboardPlayer leaderboardPlayer = mock(LeaderboardPlayer.class);
        when(leaderboardPlayer.getId()).thenReturn(id);
        when(leaderboardPlayer.getLeaderboardEntry()).thenReturn(leaderboardEntry);
        return leaderboardPlayer;
    }

}