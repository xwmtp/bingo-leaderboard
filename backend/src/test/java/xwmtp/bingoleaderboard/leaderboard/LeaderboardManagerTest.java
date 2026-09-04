package xwmtp.bingoleaderboard.leaderboard;

import org.junit.jupiter.api.Test;
import xwmtp.bingoleaderboard.data.Player;
import xwmtp.bingoleaderboard.data.racetime.DownloadData;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
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

        assertThat(ids).containsExactly("a", "c", "d");
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
            LeaderboardPlayerWithLeaderboardTime("a", Duration.parse("PT1H14M21S")),
            LeaderboardPlayerWithLeaderboardTime("b", Duration.parse("PT1H02M58S")),
            LeaderboardPlayerWithLeaderboardTime("c", Duration.parse("PT0H00M00S")),
            LeaderboardPlayerWithLeaderboardTime("d", Duration.parse("PT2H48M11S")),
            LeaderboardPlayerWithLeaderboardTime("e", Duration.parse("PT1H37M02S")),
            LeaderboardPlayerWithLeaderboardTime("f", Duration.parse("PT10H00M00S"))
        );

        final List<String> ids = leaderboardManager.makeLeaderboardEntries(testPlayers)
                .stream()
                .map(LeaderboardEntry::getPlayerId)
                .collect(Collectors.toList());

        assertThat(ids).containsExactly("c", "b", "a", "e", "d", "f");
    }

    private LeaderboardPlayer LeaderboardPlayerWithLeaderboardTime(String id, Duration leaderboardTime) {
        final LeaderboardEntry leaderboardEntry = mock(LeaderboardEntry.class);
        when(leaderboardEntry.getLeaderboardTimeAsDuration()).thenReturn(leaderboardTime);
        when(leaderboardEntry.getPlayerId()).thenReturn(id);

        final LeaderboardPlayer leaderboardPlayer = mock(LeaderboardPlayer.class);
        when(leaderboardPlayer.getId()).thenReturn(id);
        when(leaderboardPlayer.getLeaderboardEntry()).thenReturn(leaderboardEntry);
        return leaderboardPlayer;
    }
}
