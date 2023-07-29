package xwmtp.bingoleaderboard.data.racetime.model.race;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import org.junit.jupiter.api.Test;
import xwmtp.bingoleaderboard.data.racetime.model.leaderboard.RacetimeLeaderboardPage;
import com.google.gson.Gson;

import java.time.Duration;
import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class RacetimeRaceTest {

    private final JsonDeserializer<Instant> instantDeserializer = (json, typeOfT, context) -> Instant.parse(json.getAsString());
    private final JsonDeserializer<Duration> durationDeserializer = (json, typeOfT, context) -> Duration.parse(json.getAsString());

    private final Gson gson = new GsonBuilder()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .registerTypeAdapter(Instant.class, instantDeserializer)
            .registerTypeAdapter(Duration.class, durationDeserializer)
            .create();

    @Test
    void picksValidBingos() {

        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/v10.2/bingo.html?seed=169977&mode=normal")
                .isValidBingoRace()).isEqualTo(true);
        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/v9.3.1/bingo.html?mode=normal&seed=169977")
                .isValidBingoRace()).isEqualTo(true);
        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/bingo.html?seed=643331&version=10.3")
                .isValidBingoRace()).isEqualTo(true);
        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/bingo.html?version=10.3")
                .isValidBingoRace()).isEqualTo(true);
        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/bingo.html?version=beta10.3")
                .isValidBingoRace()).isEqualTo(true);
        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/bingo.html?lololversion=10.3lolol")
                .isValidBingoRace()).isEqualTo(true);

        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/bingo.html", "sm64/dazzling-gibdo-1234")
                .isValidBingoRace()).isEqualTo(false);
        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/bingo.html")
                .isValidBingoRace()).isEqualTo(false);
        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/bingo.html?version=10.3&mode=crazy")
                .isValidBingoRace()).isEqualTo(false);
        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/bingo.html?version=10.3&mode=long")
                .isValidBingoRace()).isEqualTo(false);
        assertThat(racetimeRace("Bingo", "https://ootbingo.github.io/bingo/bingo.html?version=10.3&mode=normal&type=4x4")
                .isValidBingoRace()).isEqualTo(false);
        assertThat(racetimeRace("GSR", "https://ootbingo.github.io/bingo/v10.2/bingo.html?seed=169977&mode=normal")
                .isValidBingoRace()).isEqualTo(false);

    }

    private final RacetimeRace racetimeRace(String goal, String info, String name) {
        String json = String.format("{\"version\": 41,\"name\": \"%s\",\"goal\": {\"name\": \"%s\",\"custom\": false},\"info\": \"%s\",\"entrants\": [],\"ended_at\": null,\"recorded\": true}", name, goal, info);
        return gson.fromJson(json, RacetimeRace.class);
    }

    private final RacetimeRace racetimeRace(String goal, String info) {
       return racetimeRace(goal, info, "oot/dizzy-ocarina-6337");
    }
}

