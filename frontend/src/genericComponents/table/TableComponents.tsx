import styled from "styled-components";
import {Colors, ScreenWidths} from "../../style/GlobalStyle.tsx";

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
  border-radius: 0.7rem;
  background-color: ${Colors.rowColor};
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 0.5rem 0.5rem 0.5rem 1.3rem;
  &:hover {
    background-color: ${Colors.highlightColor};
  }
`;

const RowCellBase = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RowCell = styled(RowCellBase)`
  padding-left: 0.3rem;
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
  border-radius: 0.7rem;
  padding: 0.5rem 0.5rem 0.5rem 1.3rem;
  margin-bottom: 0.3rem;

  @media (max-width: ${ScreenWidths.tablet}px) {
    font-weight: normal;
  }
`;

export const HeaderCell = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  user-select: none;

  &:hover {
    color: ${Colors.yellow};
  }
`;
