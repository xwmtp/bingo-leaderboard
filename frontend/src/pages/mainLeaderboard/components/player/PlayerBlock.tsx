import React from "react";
import styled from "styled-components";
import {PlayerTableBlock} from "./PlayerTableBlock.tsx";
import {PlayerStats} from "./PlayerStats.tsx";
import {BingoPlayer} from "./playerData.ts";
import {Colors} from "../../../../style/GlobalStyle.tsx";

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
  position: sticky;
  top: 3.3rem;
  align-self: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 0.7rem;
  row-gap: 2rem;
`;

const NoTableDiv = styled.div`
  display: flex;
  position: sticky;
  top: 3.3rem;
  color: grey;
  margin-top: 6.7rem;
  height: 100%;
`;

const PlayerAnchor = styled.a`
  h2 {
    transition: color 0.2s ease;
    &:hover {
      color: ${Colors.yellow};
    }
  }
`;
