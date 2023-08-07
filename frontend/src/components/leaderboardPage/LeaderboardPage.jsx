import styled from "styled-components";
import React, { useEffect, useState } from "react";
import "./TableTheme.js";
import { PlayerBlock } from "./player/PlayerBlock";
import { LeaderboardBlock } from "./leaderboard/LeaderboardBlock";

export function LeaderboardPage({ leaderboardData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [playerData, setPlayerData] = useState([]);
  const [selectedPlayerName, setSelectedPlayerName] = useState(undefined);

  useEffect(() => {
    fetch(encodeURI(`${process.env.REACT_APP_BACKEND_URL}/players`), {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (r.status / 100 !== 2) {
          setPlayerData([]);
          throw Error(r.status);
        }
        return r.json();
      })
      .then((playerData) => {
        setPlayerData(playerData?.data ?? []);
      })
      .catch(() => console.log("Could not download player data."))
      .finally(() => setIsLoading(false));
  }, []);

  const playerTableData =
    playerData.length > 0 && selectedPlayerName !== undefined
      ? playerData.find((player) => player.name === selectedPlayerName)
      : { name: "", leaderboardEntry: [], results: [] };

  if (leaderboardData === undefined) {
    return <EmptyDiv id="empty" />;
  }

  if (leaderboardData.length === 0) {
    return (
      <NoDataDiv id="no-data">
        <p>Currently no data available.</p>
      </NoDataDiv>
    );
  }

  return (
    <LeaderboardPageDiv id="leaderboard-page">
      <LeaderboardBlock
        data={leaderboardData}
        onRowClick={(row) => setSelectedPlayerName(row.playerName)}
      />
      <PlayerBlock data={playerTableData} />
    </LeaderboardPageDiv>
  );
}

const LeaderboardPageDiv = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
`;

const NoDataDiv = styled.div`
  display: flex;
  margin-top: 100px;
  height: 100%;
`;

const EmptyDiv = styled.div`
  display: flex;
  height: 100%;
`;
