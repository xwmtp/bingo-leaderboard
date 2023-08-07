import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import ReactTimeAgo from "react-time-ago";
import { customStyles } from "../TableTheme.js";

export function LeaderboardBlock(props) {
  const columns = [
    {
      name: "Rank",
      selector: "rank",
      sortable: true,
      width: "60px",
      center: true,
    },
    {
      name: "Name",
      selector: "playerName",
      sortable: true,
      minWidth: "170px",
      center: true,
      sortFunction: (a, b) => {
        a = a.playerName.toLowerCase();
        b = b.playerName.toLowerCase();
        return a === b ? 0 : a > b ? 1 : -1;
      },
    },
    {
      name: "Score",
      selector: "leaderboardScore",
      width: "60px",
      sortable: true,
      center: true,
    },
    {
      name: "LB time",
      selector: "leaderboardTime",
      width: "90px",
      sortable: true,
      hide: 1300,
      center: true,
    },
    {
      name: "Last seen",
      selector: "lastRaced",
      width: "70px",
      sortable: true,
      format: (row, idx) => <ReactTimeAgo date={new Date(row.lastRaced)} timeStyle="mini-minute" />,
      hide: 1300,
      right: true,
    },
    {
      name: "Finished",
      selector: "finishedRacesFraction",
      sortable: false,
      center: true,
      sortFunction: (a, b) => {
        const a1 = parseInt(a.finishedRacesFraction.split("/")[0]);
        const a2 = parseInt(a.finishedRacesFraction.split("/")[1]);
        const b1 = parseInt(b.finishedRacesFraction.split("/")[0]);
        const b2 = parseInt(b.finishedRacesFraction.split("/")[1]);
        a = a1 + 0.01 * a2;
        b = b1 + 0.01 * b2;
        return a === b ? 0 : a > b ? 1 : -1;
      },
    },
  ];

  return (
    <LeaderboardDiv id="leaderboard-div">
      <TableDiv>
        <DataTable
          title="Leaderboard"
          columns={columns}
          data={props.data.entries}
          theme="bingo"
          customStyles={customStyles}
          noHeader="true"
          onRowClicked={props.onRowClick}
          pointerOnHover={true}
        />
      </TableDiv>
    </LeaderboardDiv>
  );
}

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
