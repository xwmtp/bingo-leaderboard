import styled from "styled-components";

export const TableWrapper = styled.div<{$numColumns: number}>`
  display: grid;
  grid-template-columns: repeat(${({$numColumns}) => $numColumns}, auto);
`;

const TableRowBase = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: end;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  text-decoration: none;
  color: inherit;
`;

export const TableRow = styled(TableRowBase)`
  border-radius: 10px;
  background-color: var(--row-color);
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 7px 8px 7px 20px;
  &:hover {
    background-color: var(--highlight-color);
  }
`;

const RowCellBase = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RowCell = styled(RowCellBase)`
  padding-left: 4px;

  @media screen and (max-width: 768px) {
    padding-left: 2px;
  }
`;

const HeaderRowBase = styled.div`
  grid-column-start: 1;
  grid-column-end: end;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
`;

export const HeaderRow = styled(HeaderRowBase)`
  font-weight: bold;
  border-radius: 10px;
  padding: 7px 8px 7px 20px;
  margin-bottom: 4px;

  @media screen and (max-width: 768px) {
    font-weight: normal;
    font-size: 8px;
  }
`;

export const HeaderCell = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 3px;
  cursor: pointer;
  transition: color 0.3s ease;
  user-select: none;

  &:hover {
    color: var(--yellow);
  }
`;
