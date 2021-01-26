package xwmtp.bingoleaderboard;

public class Main {

    public static void main(String[] args) {
        final int maxResults = 15;
        final int dropResults = 3;
        Leaderboard leaderboard = new Leaderboard();
        System.out.println(leaderboard);
        leaderboard.constructLeaderboard(maxResults, dropResults);
        System.out.println(leaderboard);
    }
}
