package xwmtp.bingoleaderboard.util;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Date {

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)
            .withLocale(Locale.US)
            .withZone(ZoneId.of("UTC"));

    public static String formatDate(Instant date) {
        return dateFormatter.format(date);
    }
}
