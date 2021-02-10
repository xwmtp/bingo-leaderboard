import React from "react";
import styled from "styled-components";
import PlayerTable from "./PlayerTable";
import Tooltip from "./Tooltip"

const PlayerDiv = styled.div`
    display: flex;
    position: sticky;
    top: 50px;
    align-self: flex-start;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    width: 45%;
    max-width: 700px;
    margin-left: 20px;
    margin-top: 10px;
    //border: solid grey 1px;

    .bold {
        font-weight: bold;
    }

    .align-right {
        align-items: flex-end;
    }
`

const PlayerInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const PlayerStats = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    margin: 15px 0px;
    padding: 0px 20px;
    //border: solid green 1px;
`

const PlayerTimes = styled.div`
    display: flex;
    width: 210px;
    flex-direction: row;
    justify-content: center;
    //border: 1px solid fuchsia;

`

const StatColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 5px;

`

const PlayerExplanation = styled.div`
    color: grey;
    width: 100%;
    font-size: 14px;
    text-align: center;
    span {
        font-weight: bold;
    }
`

function PlayerBlock(props) {
    console.log(props.data)
    const playerInfo = props.data.name === "" ? <></> :
        <PlayerInfo>
            <h2>
                {`#${props.data.leaderboardEntry.rank} ${props.data.name}`}
            </h2>
            <PlayerStats>
                <PlayerTimes>
                    <StatColumn className="bold">
                        <Tooltip title="average time"
                            textheader="average time"
                            text={`Average of the times ${props.data.name} got in their latest 15 races. Ignores unfinished races, therefore favors those with more forfeits.`} />
                        <Tooltip title="median time"
                            textheader="median time"
                            text={`Median of the times ${props.data.name} got in their latest 15 races. Unfinished races are replaced with the worst time of the finished races. Compared to average, this is a fairer metric when it comes to forfeits.`} />
                        <Tooltip title="leaderboard time"
                            textheader="leaderboard time"
                            text={`Average of the aged times of ${props.data.name}'s latest 15 races, but ignores the worst 3 aged times (gray rows in the table). Learn more about how the leaderboard time is calculated on the 'About' page.`} />
                    </StatColumn>
                    <StatColumn>
                        <p>{props.data.leaderboardEntry.average}</p>
                        <p>{props.data.leaderboardEntry.effectiveMedian}</p>
                        <p>{props.data.leaderboardEntry.leaderboardTime}</p>
                    </StatColumn>

                </PlayerTimes>
                <PlayerTimes>
                    <StatColumn className="bold">
                    <Tooltip title="leaderboard score"
                            textheader="leaderboard score"
                            text={`Directly tied to the leaderboard time. Decreases over time when a player isn't active.`} />
                        <p>racetime points</p>

                    </StatColumn>
                    <StatColumn className="align-right">
                        <p>{props.data.leaderboardEntry.leaderboardScore}</p>
                        <p>{props.data.leaderboardEntry.racetimePoints}</p>
                    </StatColumn>
                </PlayerTimes>
            </PlayerStats>
        </PlayerInfo>

    const playerExplanation = props.data.name === "" ? <></> :
        <PlayerExplanation>
            <p>Click on a row to go to the Racetime page of that race.</p>
            <p>Hover over the stats for more information, or visit to the About page.</p>
        </PlayerExplanation>



    return (
        <PlayerDiv id="player-div">
            {playerInfo}
            <PlayerTable data={props.data} />
            {playerExplanation}
        </PlayerDiv>
    );
}

export default PlayerBlock;