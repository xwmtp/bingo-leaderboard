import React, {useMemo} from "react";
import styled from "styled-components";
import {RaceResult, toPlayerTableData} from "./playerData.ts";
import {PlayerTable} from "./PlayerTable.tsx";

interface Props {
  raceResults: RaceResult[];
}

export const PlayerTableBlock: React.FC<Props> = ({raceResults}) => {
  const playerTableData = useMemo(() => toPlayerTableData(raceResults), [raceResults]);

  return (
    <TableDiv id="player-table-div">
      <PlayerTable tableData={playerTableData} />
    </TableDiv>
  );
};

const TableDiv = styled.div`
  width: 100%;
`;
