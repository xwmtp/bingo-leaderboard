import React from "react";
import styled from "styled-components";
import PlayerTable from "./PlayerTable";

const PlayerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 45%;
    max-width: 700px;
    margin-left: 20px;
    //border: solid grey 1px;

    .bold {
        font-weight: bold;
    }

    .align-right {
        align-items: flex-end;
    }
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
    width: 200px;
    flex-direction: row;
    justify-content: center;
    //border: 1px solid fuchsia;

`


const StatColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 5px;

`


function PlayerBlock(props) {
    console.log(props.data)
    const playerStats = props.data.name === ""? <></> :
        <PlayerStats>
            <PlayerTimes>
                <StatColumn className="bold">
                    <p>average time</p>
                    <p>median time</p>
                </StatColumn>
                <StatColumn>
                    <p>{props.data.leaderboardEntry.average}</p>
                    <p>{props.data.leaderboardEntry.effectiveMedian}</p>
                </StatColumn>

            </PlayerTimes>
            <PlayerTimes>
                <StatColumn className="bold">
                    <p>leaderboard score</p>
                    <p>racetime points</p>

                </StatColumn>
                <StatColumn className="align-right">
                    <p>{props.data.leaderboardEntry.leaderboardScore}</p>
                    <p>{props.data.leaderboardEntry.racetimePoints}</p>
                </StatColumn>
            </PlayerTimes>
        </PlayerStats>

    return (
        <PlayerDiv id="player-div">
            <h2>
                {`#${props.data.leaderboardEntry.rank} ${props.data.name}`}
            </h2>
            {playerStats}
            <PlayerTable data={props.data} />
        </PlayerDiv>
    );
}

export default PlayerBlock;