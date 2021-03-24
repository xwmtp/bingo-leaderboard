package xwmtp.bingoleaderboard.util;

import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class DurationsTest {

    // average

    @Test
    void averageOfEmptyDurationsReturnsZeroDuration() {
        assertTrue(Durations.average(Collections.emptyList()).isZero());
    }

    @Test
    void computesCorrectAverage() {
        ArrayList<Duration> durations = new ArrayList<>();
        durations.add(Duration.ofMinutes(70));
        durations.add(Duration.ofMinutes(90));
        assertEquals(Durations.average(durations), Duration.ofMinutes(80));
    }

    @Test
    void averageOfSingleElement() {
        ArrayList<Duration> durations = new ArrayList<>();
        durations.add(Duration.ofMinutes(68));
        assertEquals(Durations.average(durations), Duration.ofMinutes(68));
    }

    // median

    @Test
    void medianOfEmptyDurationsReturnsZeroDuration() {
        assertTrue(Durations.median(Collections.emptyList()).isZero());
    }

    @Test
    void medianOfSingleElement() {
        ArrayList<Duration> durations = new ArrayList<>();
        durations.add(Duration.ofMinutes(61));
        assertEquals(Durations.median(durations), Duration.ofMinutes(61));
    }

    @Test
    void computesCorrectMedianOverOddList() {
        ArrayList<Duration> durations = new ArrayList<>();
        durations.add(Duration.ofMinutes(70));
        durations.add(Duration.ofMinutes(73));
        durations.add(Duration.ofMinutes(90));
        assertEquals(Durations.median(durations), Duration.ofMinutes(73));
    }

    @Test
    void computesCorrectMedianOverEvenList() {
        ArrayList<Duration> durations = new ArrayList<>();
        durations.add(Duration.ofMinutes(72));
        durations.add(Duration.ofMinutes(78));
        assertEquals(Durations.median(durations), Duration.ofMinutes(75));
    }

    // formatDuration

    @Test
    void showsCorrectFormatForEmptyDurations() {
        assertEquals(Durations.formatDuration(Duration.ZERO), "0:00:00");
    }

    @Test
    void showsCorrectFormatForDuration() {
        assertEquals(Durations.formatDuration(Duration.ofSeconds(104039)), "28:53:59");
        assertEquals(Durations.formatDuration(Duration.ofSeconds(4357)), "1:12:37");
        assertEquals(Durations.formatDuration(Duration.ofSeconds(2589)), "0:43:09");
        assertEquals(Durations.formatDuration(Duration.ofSeconds(468)), "0:07:48");
        assertEquals(Durations.formatDuration(Duration.ofSeconds(5)), "0:00:05");
    }
 }