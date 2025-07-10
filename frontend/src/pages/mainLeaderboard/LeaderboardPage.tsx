import styled from "styled-components";
import React, {useState} from "react";
import {PlayerBlock} from "./components/player/PlayerBlock.tsx";
import {BingoLeaderboardData} from "../../api/dataModels/bingoLeaderboardModels.ts";
import {LeaderboardTable} from "./components/LeaderboardTable.tsx";
import {getBingoPlayers} from "../../api/bingoLeaderboardApi.ts";
import {useQuery} from "@tanstack/react-query";
import {PlayerModal} from "./components/player/PlayerModal.tsx";
import {useWindowDimensions} from "../../hooks/useWindowDimensions.tsx";
import {ScreenHeights, ScreenWidths} from "../../style/GlobalStyle.tsx";

interface Props {
  leaderboardData: BingoLeaderboardData;
}

export const LeaderboardPage: React.FC<Props> = ({leaderboardData}) => {
  const [selectedPlayerName, setSelectedPlayerName] = useState<string | undefined>(undefined);

  const {data: playerData} = useQuery({
    queryKey: ["getBingoPlayers"],
    queryFn: () => getBingoPlayers(),
  });

  const playerTableData =
    playerData && playerData.length > 0 && selectedPlayerName !== undefined
      ? playerData.find((player) => player.name === selectedPlayerName)
      : undefined;

  const {width, height} = useWindowDimensions();
  const isModalMode =
    width <= ScreenWidths.playerTableCutoff || height <= ScreenHeights.playerTableCutoff;

  if (leaderboardData.tableData.rows.length === 0) {
    return (
      <NoDataDiv id="no-data">
        <p>Currently no data available.</p>
      </NoDataDiv>
    );
  }

  return (
    <Leaderboard id="leaderboard-page">
      <ContentLeft id="leaderboard-content-left">
        <LeaderboardTable
          tableData={leaderboardData.tableData}
          onRowClick={(row) => setSelectedPlayerName(row.name)}
          selectedPlayerName={selectedPlayerName}
        />
      </ContentLeft>

      {isModalMode ? (
        <PlayerModal player={playerTableData} onClose={() => setSelectedPlayerName(undefined)} />
      ) : (
        <ContentRight id="leaderboard-content-right">
          <PlayerBlock player={playerTableData} />
        </ContentRight>
      )}
    </Leaderboard>
  );
};

const Leaderboard = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 1;
  justify-content: center;
  column-gap: 3.3rem;
  padding: 0 1.3rem;
`;

const ContentLeft = styled.div`
  display: flex;
  flex-grow: 1.3;
  max-width: 52rem;
`;

const ContentRight = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 44rem;
`;

const NoDataDiv = styled.div`
  display: flex;
  margin-top: 7rem;
  height: 100%;
`;
