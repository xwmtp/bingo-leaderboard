import styled from "styled-components";

export const TableWrapper = styled.div<{$numColumns: number}>`
  display: grid;
  grid-template-columns: repeat(${({$numColumns}) => $numColumns}, auto);
`;

export const TableRow = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: end;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  text-decoration: none;
  color: inherit;
`;
