package xwmtp.bingoleaderboard.data;

import org.junit.jupiter.api.Test;
import xwmtp.bingoleaderboard.data.racetime.model.RacetimeUser;
import xwmtp.bingoleaderboard.data.racetime.model.leaderboard.RacetimeRanking;

import java.time.Duration;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class PlayerTest {

   /* final Player testPlayer1 = playerWithResults(List.of(
            result(false, Duration.ofMinutes(71), Duration.ofMinutes(73)),
            result(true, null, null),
            result(false, Duration.ofMinutes(89), Duration.ofMinutes(89)),
            result(false, Duration.ofMinutes(65), Duration.ofMinutes(72))
    ));*/
    private final int DROP_RESULTS = 1;

    // leaderboardScore

    @Test
    void leaderboardScoreRetainsOrderOfLeaderboardTime() {
        final int SECONDS_1H05 = 3900;
        final int SECONDS_1H20 = 4800;
        int prev_score = Integer.MAX_VALUE;
        for (int i = SECONDS_1H05; i <= SECONDS_1H20; i++) {
            int score = playerWithLeaderboardTime(Duration.ofSeconds(i)).leaderboardScore(DROP_RESULTS);
            assertThat(score).isLessThanOrEqualTo(prev_score);
            prev_score = score;
        }
    }

    @Test
    void leaderboardScoreNotNegative() {
        int scoreZeroSeconds = playerWithLeaderboardTime(Duration.ofSeconds(0)).leaderboardScore(DROP_RESULTS);
        assertThat(scoreZeroSeconds).isNotNegative();

        int score24Hours = playerWithLeaderboardTime(Duration.ofHours(24)).leaderboardScore(DROP_RESULTS);
        assertThat(score24Hours).isNotNegative();
    }

    @Test
    void leaderboardScoreIs1000ForA1H05() {
        int score = playerWithLeaderboardTime(Duration.ofMinutes(65)).leaderboardScore(DROP_RESULTS);
        assertThat(score).isEqualTo(1000);
    }

    // leaderboardTime

    @Test
    void leaderboardTimeCalculatedCorrectly() {
        final Player testPlayer = playerWithResults(List.of(
                result(false, Duration.ofMinutes(71), Duration.ofMinutes(73)),
                result(true, Duration.ofHours(999), Duration.ofHours(999)),
                result(false, Duration.ofMinutes(90), Duration.ofMinutes(90)),
                result(false, Duration.ofMinutes(65), Duration.ofMinutes(70)),
                result(true, Duration.ofHours(999), Duration.ofHours(999))
        ));
        assertThat(testPlayer.leaderboardTime(DROP_RESULTS)).isEqualTo(Duration.ofMinutes(83));
    }

    // average

    @Test
    void averageCalculatedCorrectly() {
        final Player testPlayer = playerWithResults(List.of(
                result(false, Duration.ofMinutes(73), Duration.ofMinutes(74)),
                result(true, Duration.ofHours(999), Duration.ofHours(999)),
                result(false, Duration.ofMinutes(90), Duration.ofMinutes(90)),
                result(false, Duration.ofMinutes(65), Duration.ofMinutes(70)),
                result(true, Duration.ofHours(999), Duration.ofHours(999))
        ));
        assertThat(testPlayer.average()).isEqualTo(Duration.ofMinutes(76));
    }

    // effectiveAverage

    @Test
    void effectiveAverageCalculatedCorrectly() {
        final Player testPlayer = playerWithResults(List.of(
                result(false, Duration.ofMinutes(74), Duration.ofMinutes(76)),
                result(true, Duration.ofHours(999), Duration.ofHours(999)),
                result(false, Duration.ofMinutes(90), Duration.ofMinutes(90)),
                result(false, Duration.ofMinutes(65), Duration.ofMinutes(70)),
                result(true, Duration.ofHours(999), Duration.ofHours(999))
        ));
        assertThat(testPlayer.effectiveAverage(DROP_RESULTS)).isEqualTo(Duration.ofMinutes(82));
    }

    private Result result(boolean isForfeit, Duration time, Duration agedTime) {
        Result result = mock(Result.class);
        when(result.isForfeit()).thenReturn(isForfeit);
        when(result.timePenalizedByAge()).thenReturn(agedTime);
        when(result.getTime()).thenReturn(time);
        return result;
    }

    private Player playerWithResults(List<Result> results) {
        RacetimeRanking ranking = new RacetimeRanking();
        RacetimeUser user = new RacetimeUser();
        ranking.setUser(user);
        return new Player(ranking, results);
    }

    private Player playerWithLeaderboardTime(Duration time) {
        Player player = mock(Player.class);
        when(player.leaderboardTime(anyInt())).thenReturn(time);
        doCallRealMethod().when(player).leaderboardScore(anyInt());
        return player;
    }

}