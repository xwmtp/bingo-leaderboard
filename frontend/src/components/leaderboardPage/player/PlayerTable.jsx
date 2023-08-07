import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { customStyles } from "../TableTheme.js";

export function PlayerTable(props) {
  const noTable = (
    <NoTableDiv>
      <p>Click on a leaderboard row to display player info.</p>
    </NoTableDiv>
  );

  const table = (
    <TableDiv>
      <DataTable
        title="Leaderboard"
        columns={columns}
        data={props.data.results}
        theme="bingo"
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        onRowClicked={onRowClicked}
        noHeader="true"
        noDataComponent={noTable}
        pointerOnHover={true}
      />
    </TableDiv>
  );

  return props.data.name === "" ? noTable : table;
}

const conditionalRowStyles = [
  {
    when: (row) => row.dropped,
    style: {
      color: "grey",
    },
  },
];

const onRowClicked = (row) => {
  window.open(`https://www.racetime.gg/${row.slug}`);
};

const columns = [
  {
    name: "Time",
    selector: "time",
    width: "105px",
    sortable: true,
    center: true,
  },
  {
    name: "Aged",
    selector: "agedTime",
    width: "105px",
    sortable: true,
    center: true,
  },
  {
    name: "Date",
    selector: "date",
    sortable: true,
    width: "120px",
    center: true,
    format: (row, idx) => row.date.split("T")[0],
  },
  {
    name: "Comment",
    selector: "comment",
    sortable: false,
    maxWidth: "230px",
    hide: 1300,
    left: true,
  },
];

const TableDiv = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const NoTableDiv = styled.div`
  display: flex;
  position: sticky;
  top: 50px;
  color: grey;
  margin-top: 100px;
  height: 100%;
`;
