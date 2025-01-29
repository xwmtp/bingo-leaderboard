import React from "react";
import styled from "styled-components";
import {PlayerTableBlock} from "./PlayerTableBlock.tsx";
import {PlayerStats} from "./PlayerStats.tsx";
import {BingoPlayer} from "./playerData.ts";

interface Props {
  player?: BingoPlayer;
}

export const PlayerBlock: React.FC<Props> = ({player}) => {
  if (!player) {
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
      <PlayerName player={player} />
      <PlayerStats player={player} />
      <PlayerTableBlock raceResults={player.results} />
    </PlayerDiv>
  );
};

const PlayerName: React.FC<{player: BingoPlayer}> = ({player}) => {
  return (
    <PlayerAnchor href={`https://racetime.gg/user/${player.id}`} target="_blank" rel="noreferrer">
      <h2>{`#${player.leaderboardEntry.rank} ${player.name}`}</h2>
    </PlayerAnchor>
  );
};

const PlayerDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-height: 620px) {
    position: sticky;
    top: -150px;
  }
  @media (min-height: 830px) {
    position: sticky;
    top: 50px;
  }
  align-self: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  row-gap: 30px;
`;

const NoTableDiv = styled.div`
  display: flex;
  position: sticky;
  top: 50px;
  color: grey;
  margin-top: 100px;
  height: 100%;
`;

const PlayerAnchor = styled.a`
  h2 {
    transition: color 0.2s ease;
    &:hover {
      color: var(--yellow);
    }
  }
`;
