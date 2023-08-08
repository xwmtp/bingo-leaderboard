import React from "react";
import styled from "styled-components";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../TableTheme.js";

interface Props {
  data?: DataRow[];
}

interface DataRow {
  slug: string;
  time: string;
  agedTime: string;
  forfeit: false;
  date: string;
  comment: string;
  dropped: false;
}

export const PlayerTable: React.FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <NoTableDiv>
        <p>Click on a leaderboard row to display player info.</p>
      </NoTableDiv>
    );
  }

  return (
    <TableDiv>
      <DataTable
        title="Leaderboard"
        columns={columns}
        data={data}
        theme="bingo"
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        onRowClicked={onRowClicked}
        noHeader={true}
        pointerOnHover={true}
      />
    </TableDiv>
  );
};

const conditionalRowStyles = [
  {
    when: (row: DataRow) => row.dropped,
    style: {
      color: "grey",
    },
  },
];

const onRowClicked = (row: DataRow) => {
  window.open(`https://www.racetime.gg/${row.slug}`);
};

const columns: TableColumn<DataRow>[] = [
  {
    name: "Time",
    selector: (row) => row.time,
    width: "105px",
    sortable: true,
    center: true,
  },
  {
    name: "Aged",
    selector: (row) => row.agedTime,
    width: "105px",
    sortable: true,
    center: true,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
    width: "120px",
    center: true,
    format: (row, idx) => row.date.split("T")[0],
  },
  {
    name: "Comment",
    selector: (row) => row.comment,
    sortable: false,
    maxWidth: "230px",
    hide: 1300,
    // left: true,
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
