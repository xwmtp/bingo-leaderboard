import styled from "styled-components";
import React from "react";

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
        ul, p {
            margin: 10px 0px 20px 0px;
        }
        span {
            font-weight: bold;
        }
        h3 {
            color: var(--orange);
        }
`

const racetime = <a href="https://racetime.gg" target="_blank" rel="noreferrer">Racetime.gg</a>
const bingoCard = <a href="https://ootbingo.github.io/bingo" target="_blank" rel="noreferrer">Bingo card</a>

function AboutPage() {

    return (
        <AboutDiv id='about' >
            <h2>
                Bingo Leaderboard
            </h2>
            <p>
                This is a leaderboard for Ocarina of Time Bingo.
                It only considers races that took place on {racetime} in the 'Bingo' category and that used a normal {bingoCard}.
                For each player, only their <span>15</span> most recent results count for the leaderboard. DQs are ignored, but forfeits are included.
                The leaderboard retrieves the latest from Racetime once a day at <span>9am UTC</span>.
            </p>
            <h2>
                Features
            </h2>
            <ul>
                <li>
                    Click on a leaderboard row to display the latest races of that player.
                    </li>
                <li>
                    Click on a row in the player's races table to open the Racetime page of that race.
                    </li>
                <li>
                    Most columns are sortable, click on the header of a column to sort it.
                    </li>
                <li>
                    Hover over the player stats for a short explanation. For a longer explanation, read below.
                    </li>
            </ul>
            <h2>
                Calculation
            </h2>
            <p>
                Your leaderboard position is based on your <span>leaderboard time</span>.
                This metric tries to be as fair as possible, by ignoring your three worst results to balance out differences in amount of forfeits between players.
                In addition, when you're inactive for a while, your leaderboard time increases to favor more active players on the leaderboard.
                Below you find a more in-depth explanation of how the metrics on the leaderboard are calculated.
            </p>
            <h3>
                Aged time
            </h3>
            <p>
                For each Bingo result, the 'aged' time is calculated.
                This is the time penalized by how old the result is.
                The first 60 days after a race took place there is no penalty yet.
                Afterwards, a multiplier that starts at <span>1</span> and linearly increases to <span>1.2</span> at 730 days (two years) is applied.
                This is the max, so after two years the aged time won't increase anymore.
                The idea behind the aged time is that old results are less relevant, and inactive players should slowly lose points on the leaderboard.
            </p>
            <h3>
                Leaderboard time
            </h3>
            <p>
                To calculate the leaderboard time, your 3 results with the highest aged time are dropped.
                If you have less than three races, no races are dropped.
                Forfeits are considered to have a higher time than any other race, so they will be selected to be dropped first.
                If you have more than three forfeits, each forfeited result will be replaced with a <span>forfeit time</span>.
                The forfeit time is either <span>1.1 * average of finished times</span>, or <span>1.2 * worst time</span>, whatever is higher.
                Generally, most players don't have more than 3 forfeits in 15 races so this will only be needed when there are many forfeits.
            </p>
            <h3>
                Leaderboard score
            </h3>
            <p>
                Your leaderboard score is directly tied to your leaderboard time.
                To calculate it, the leaderboard time is converted to seconds and scaled to a number that's generally between 0 and 1.
                A 1:05 leaderboard time results in a 0, and a 3:00 in a 1.
                This number is put through a sigmoid function (<span>2 / (1 + e^(4*x))</span>), so that differences in points are less steep for higher leaderboard times.
                Finally, this number is multiplied by 1000 to result in the score.
                For example, a 1:05 leaderboard time would result in 1000 points, a 1:20 in 745 points, a 2:00 in 275 points.
            </p>
            <h3>
                Average time
            </h3>
            <p>
                The average time is displayed as a metric, but doesn't have any effect on the ranking.
                Like with the leaderboard time, the worst three aged results are dropped.
                So the average is calculated over the non-gray rows in the races table.
            </p>
        </AboutDiv>
    );
}

export default AboutPage;
