package xwmtp.bingoleaderboard.util;

import java.time.Duration;
import java.util.Collections;
import java.util.List;

public class Durations {

    public static Duration average(List<Duration> durations) {
        if (durations.isEmpty()) {
            return Duration.ZERO;
        }
        return durations.stream()
                .reduce(Duration.ZERO, Duration::plus)
                .dividedBy(durations.size());
    }

    public static Duration median(List<Duration> durations) {
        if (durations.isEmpty()) {
            return Duration.ZERO;
        }
        Collections.sort(durations);
        int middle = durations.size() / 2;
        if (durations.size() % 2 == 0) {
            Duration sumMiddles = durations.get(middle - 1).plus(durations.get(middle));
            return sumMiddles.dividedBy(2);
        } else {
            return durations.get(middle);
        }
    }

    public static String formatDuration(Duration duration) {
        return String.format("%d:%02d:%02d", duration.toHours(), duration.toMinutesPart(), duration.toSecondsPart());
    }
}
