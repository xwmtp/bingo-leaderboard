import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PlayerTable } from "./PlayerTable";
import { Tooltip } from "./Tooltip";
import { BingoLeaderboardPlayer } from "../../../service/dataModels/bingoLeaderboardModels";

interface Props {
  data?: BingoLeaderboardPlayer;
}

export const PlayerBlock: React.FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <PlayerDiv id="player-div">
        <NoTableDiv>
          <p>Click on a leaderboard row to display player info.</p>
        </NoTableDiv>
      </PlayerDiv>
    );
  }

  return (
    <PlayerDiv id="player-div">
      <PlayerInfo data={data} />
      <PlayerTable data={data.results} />
      <PlayerExplanation />
    </PlayerDiv>
  );
};

const PlayerInfo: React.FC<{ data: BingoLeaderboardPlayer }> = ({ data }) => {
  return (
    <PlayerInfoDiv>
      <a href={`https://racetime.gg/user/${data.id}`} target="_blank" rel="noreferrer">
        <h2>{`#${data.leaderboardEntry.rank} ${data.name}`}</h2>
      </a>
      <PlayerStats>
        <PlayerTimes>
          <StatColumn className="bold">
            <Tooltip
              title="average time"
              textHeader="average time"
              text={`Average of the times ${data.name} got in their latest 15 races. Ignores unfinished races, therefore favors those with more forfeits.`}
            />
            <Tooltip
              title="median time"
              textHeader="median time"
              text={`Median of the times ${data.name} got in their latest 15 races. Unfinished races are replaced with the worst time of the finished races. Compared to average, this is a fairer metric when it comes to forfeits.`}
            />
            <Tooltip
              title="leaderboard time"
              textHeader="leaderboard time"
              text={`Average of the aged times of ${data.name}'s latest 15 races, but ignores the worst 3 aged times (gray rows in the table). Learn more about how the leaderboard time is calculated on the 'About' page.`}
            />
          </StatColumn>
          <StatColumn>
            <p>{data.leaderboardEntry.average}</p>
            <p>{data.leaderboardEntry.effectiveMedian}</p>
            <p>{data.leaderboardEntry.leaderboardTime}</p>
          </StatColumn>
        </PlayerTimes>
        <PlayerTimes>
          <StatColumn className="bold">
            <Tooltip
              title="leaderboard score"
              textHeader="leaderboard score"
              text="Directly tied to the leaderboard time. Decreases over time when a player isn't active."
            />
            <p>racetime points</p>
          </StatColumn>
          <StatColumn className="align-right">
            <p>{data.leaderboardEntry.leaderboardScore}</p>
            <p>{data.leaderboardEntry.racetimePoints}</p>
          </StatColumn>
        </PlayerTimes>
      </PlayerStats>
    </PlayerInfoDiv>
  );
};

const PlayerExplanation: React.FC = () => {
  return (
    <PlayerExplanationDiv>
      <p>Click on a row/player title to go to the Racetime page.</p>
      <p>
        Hover over the stats for an explanation, or visit the <Link to="/about">About</Link> page to
        learn more.
      </p>
    </PlayerExplanationDiv>
  );
};

const PlayerDiv = styled.div`
  display: flex;
  @media (min-height: 620px) {
    position: sticky;
    top: -150px;
  }
  @media (min-height: 830px) {
    position: sticky;
    top: 50px;
  }
  align-self: flex-start;
  flex-direction: column;
  align-items: center;
  width: 45%;
  max-width: 650px;
  margin-left: 20px;
  margin-top: 10px;

  .bold {
    font-weight: bold;
  }

  .align-right {
    align-items: flex-end;
  }
`;

const PlayerInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PlayerStats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin: 15px 0px;
  padding: 0px 20px;
`;

const PlayerTimes = styled.div`
  display: flex;
  width: 210px;
  flex-direction: row;
  justify-content: center;
`;

const StatColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 5px;
`;

const PlayerExplanationDiv = styled.div`
  color: grey;
  width: 100%;
  font-size: 14px;
  text-align: center;
  span {
    font-weight: bold;
  }
`;

const Link = styled(NavLink)`
  color: var(--light-gray);
  font-weight: bold;
  text-decoration: none;
`;

const NoTableDiv = styled.div`
  display: flex;
  position: sticky;
  top: 50px;
  color: grey;
  margin-top: 100px;
  height: 100%;
`;
