import styled from "styled-components";
import React from "react";

export const AboutPage: React.FC = () => {
  return (
    <AboutDiv id="about">
      <h2>Bingo Leaderboard</h2>
      <p>
        This is a leaderboard for Ocarina of Time Bingo. It only takes into account races that took
        place on <RacetimeLink /> in the 'Bingo' category and that used a normal <BingoCardLink />.
        For each player, only their <span>15</span> most recent results count for the leaderboard.
        DQs are ignored, but forfeits are included. A player that does not have any finished Bingo
        time will not appear on the board yet. The leaderboard retrieves the latest data from
        Racetime once a day at <span>9am UTC</span>.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Click on a leaderboard row to display the latest races of that player.</li>
        <li>Click on a row in the player's races table to open the Racetime page of that race.</li>
        <li>Click on the player name above the player's table to open their Racetime user page.</li>
        <li>Most columns are sortable, click on the header of a column to sort it.</li>
        <li>
          Hover over the player stats for a short explanation. For a longer explanation, read below.
        </li>
      </ul>
      <h2>Calculation</h2>
      <p>
        Your leaderboard position is based on your <span>leaderboard time</span>. This metric tries
        to be as fair as possible, by ignoring your three worst results to balance out differences
        in amount of forfeits between players. In addition, when you're inactive for a while, your
        leaderboard time increases to favor more active players on the leaderboard. Below you find a
        more in-depth explanation of how the metrics on the leaderboard are calculated.
      </p>
      <h3>Aged time</h3>
      <p>
        For each Bingo result, the <span>'aged' time</span> is calculated. This is the time
        penalized by how old the result is. The first 60 days after a race took place there is no
        penalty yet. Afterwards, a multiplier that starts at <span>1</span> and linearly increases
        to <span>1.2</span> at 730 days (two years) is applied. This is the max, so after two years
        the aged time won't increase anymore. The idea behind the aged time is that old results are
        less relevant, and inactive players should slowly lose points on the leaderboard.
      </p>
      <h3>Leaderboard time</h3>
      <p>
        In short, the <span>leaderboard time</span> takes the average over your aged times after
        dropping the 3 worst results. Forfeits are dropped first, then results with the highest aged
        time. If you have more than three forfeits, each forfeited result will be replaced with a{" "}
        <span>forfeit time</span>. No races are dropped if you have less than 3 results. The forfeit
        time is either <span>1.1 * average of finished times</span>, or{" "}
        <span>1.2 * worst time</span>, whatever is higher. Generally, most players don't have more
        than 3 forfeits in 15 races so this will only be needed when there are many forfeits.
      </p>
      <h3>Leaderboard score</h3>
      <p>
        Your <span>leaderboard score</span> is directly tied to your leaderboard time. To calculate
        it, the leaderboard time is converted to seconds and linearly scaled to a number that's
        generally between 0 and 1. A 1:05 leaderboard time maps to 0, and a 3:00 to 1. Then a
        sigmoid function (<span>2 / (1 + e^(4*x))</span>) is applied to this number, in order to
        make differences in points less steep for higher leaderboard times. Finally, the number is
        multiplied by 1000 to result in the score. For example, a 1:05 leaderboard time would
        correspond to a score of 1000 points, a 1:20 to 745 points, and a 2:00 to 275 points.
      </p>
      <h3>Average time</h3>
      <p>
        The <span>average time</span> is displayed as a metric for each player, but doesn't have any
        effect on the ranking. From your last 15 races, it takes those that were not forfeited and
        calculates the average time. This metric will generally favor those who forfeit more often
        when they would have gotten a bad time.
      </p>
      <h3>Median time</h3>
      <p>
        The <span>median time</span> also doesn't influence the ranking in any way. To calculate the
        median, you take a player's last 15 races and sort the times. Then you take the middle time
        (or the average of the middle two if the amount of races is even). Forfeits are included and
        considered to be equal to the worst finished time. Since the median doesn't ignore forfeits,
        this metric can be considered to be more balanced than the average.
      </p>
      <h3>Finished column</h3>
      <p>
        The <span>finished</span> column in the leaderboard table shows how many races are being
        taken into account, and how many of those races finished (weren't forfeited). The number
        before the slash shows the finished races, the number behind the total amount. If a player
        completed more than 15 Bingo races in total, the second number should always show 15.
      </p>
    </AboutDiv>
  );
};

const RacetimeLink: React.FC = () => {
  return (
    <a href="https://racetime.gg" target="_blank" rel="noreferrer">
      Racetime.gg
    </a>
  );
};

const BingoCardLink: React.FC = () => {
  return (
    <a href="https://ootbingo.github.io/bingo" target="_blank" rel="noreferrer">
      Bingo card
    </a>
  );
};

const AboutDiv = styled.div`
  display: flex;
  width: 70%;
  max-width: 1000px;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  a {
    color: var(--yellow);
    font-weight: bold;
    text-decoration: none;
  }
  p {
    text-align: center;
    font-size: 17px;
  }
  ul,
  p {
    margin: 10px 0px 20px 0px;
  }
  span {
    font-weight: bold;
  }
  h3 {
    color: var(--orange);
  }
`;
