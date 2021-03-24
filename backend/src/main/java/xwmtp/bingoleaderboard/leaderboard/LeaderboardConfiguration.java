package xwmtp.bingoleaderboard.leaderboard;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LeaderboardConfiguration {

    @Bean
    public LeaderboardEntryCreator leaderboardEntryCreator() {
        return LeaderboardEntry::new;
    }
}
