package xwmtp.bingoleaderboard.leaderboard;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

class LeaderboardTest {

    private final List<LeaderboardEntry> testEntries = IntStream.range(0, 4)
            .mapToObj(i -> leaderboardEntryWithRankGetter())
            .collect(Collectors.toList());
    private final Leaderboard leaderboard = new Leaderboard(testEntries);

    @Test
    void leaderboardAssignsCorrectRanks() {
        List<Integer> ranks = leaderboard.getEntries().stream()
                .map(LeaderboardEntry::getRank)
                .collect(Collectors.toList());
        assertThat(ranks).containsExactly(1, 2, 3, 4);
    }

    @Test
    void leaderboardNumEntries() {
        assertThat(leaderboard.getNumEntries()).isEqualTo(leaderboard.getEntries().size());
    }

    private LeaderboardEntry leaderboardEntryWithRankGetter() {
        final LeaderboardEntry entry = mock(LeaderboardEntry.class);
        when(entry.getRank()).thenCallRealMethod();
        doCallRealMethod().when(entry).setRank(anyInt());
        return entry;
    }

}