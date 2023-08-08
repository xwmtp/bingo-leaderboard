import React from "react";
import styled from "styled-components";
import DataTable, { TableColumn, TableProps } from "react-data-table-component";
import ReactTimeAgo from "react-time-ago";
import { customStyles } from "../TableTheme.js";

interface Props {
  data: DataRow[];
  onRowClick: TableProps<DataRow>["onRowClicked"];
}

interface DataRow {
  rank: number;
  playerName: string;
  leaderboardScore: number;
  leaderboardTime: string;
  lastRaced: string;
  finishedRacesFraction: string;
}

export const LeaderboardBlock: React.FC<Props> = ({ data, onRowClick }) => {
  return (
    <LeaderboardDiv id="leaderboard-div">
      <TableDiv>
        <DataTable
          title="Leaderboard"
          columns={columns}
          data={data}
          theme="bingo"
          customStyles={customStyles}
          noHeader={true}
          onRowClicked={onRowClick}
          pointerOnHover={true}
        />
      </TableDiv>
    </LeaderboardDiv>
  );
};

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <TitleDiv>{title}</TitleDiv>;
};

const columns: TableColumn<DataRow>[] = [
  {
    name: <Title title="Rank" />,
    selector: (row) => row.rank,
    sortable: true,
    // width: "107px",
    center: true,
    // minWidth: "200px",
  },
  {
    name: <Title title="Name" />,
    selector: (row) => row.playerName,
    sortable: true,
    // width: "160px",
    center: true,
    sortFunction: (rowA, rowB) => {
      const nameA = rowA.playerName.toLowerCase();
      const nameB = rowB.playerName.toLowerCase();
      return nameA === nameB ? 0 : rowA > rowB ? 1 : -1;
    },
  },
  {
    name: <Title title="Score" />,
    selector: (row) => row.leaderboardScore,
    // width: "112px",
    sortable: true,
    center: true,
  },
  {
    name: <Title title="Time" />,
    selector: (row) => row.leaderboardTime,
    // width: "105px",
    sortable: true,
    hide: 1300,
    center: true,
  },
  {
    name: <Title title="Seen" />,
    selector: (row) => row.lastRaced,
    width: "50px",
    compact: true,
    sortable: true,
    format: (row, idx) => <ReactTimeAgo date={new Date(row.lastRaced)} timeStyle="mini-minute" />,
    hide: 1300,
    right: true,
  },
  {
    name: <Title title="Finished" />,
    selector: (row) => row.finishedRacesFraction,
    width: "140px",
    sortable: false,
    center: true,
    sortFunction: (a, b) => {
      const a1 = parseInt(a.finishedRacesFraction.split("/")[0]);
      const a2 = parseInt(a.finishedRacesFraction.split("/")[1]);
      const b1 = parseInt(b.finishedRacesFraction.split("/")[0]);
      const b2 = parseInt(b.finishedRacesFraction.split("/")[1]);
      const valueA = a1 + 0.01 * a2;
      const valueB = b1 + 0.01 * b2;
      return valueA === valueB ? 0 : a > b ? 1 : -1;
    },
  },
];

const LeaderboardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  max-width: 650px;
  margin-right: 20px;
`;

const TableDiv = styled.div`
  height: 100%;
  font-size: 16px;
`;

const TitleDiv = styled.div`
  //border: 1px solid red;
  flex-grow: 1;
  text-align: center;
`;
