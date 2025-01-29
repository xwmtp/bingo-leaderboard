import {RowDataWithIndex, TableData} from "./TableTypes.ts";
import styled from "styled-components";
import {SortConfig} from "./sort/sortUtils.ts";

interface Props<TRowData extends RowDataWithIndex> {
  columns: TableData<TRowData>["columns"];
  handleSort: (key: keyof TRowData) => void;
  sortConfig: SortConfig<TRowData>;
}

export function TableHeader<TRowData extends RowDataWithIndex>({
  columns,
  handleSort,
  sortConfig,
}: Props<TRowData>) {
  return (
    <HeaderRow>
      {columns.map(({key, displayName}) => (
        <HeaderCell key={key.toString()} onClick={() => handleSort(key)}>
          {displayName}{" "}
          <SortIcon>
            {sortConfig?.columnKey === key && (sortConfig.direction === "asc" ? "▲" : "▼")}
          </SortIcon>
        </HeaderCell>
      ))}
    </HeaderRow>
  );
}

const HeaderRow = styled.div`
  grid-column-start: 1;
  grid-column-end: end;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  font-weight: bold;
  border-radius: 10px;
  padding: 5px 0;

  @media screen and (max-width: 768px) {
    font-weight: normal;
    font-size: 8px;
  }
`;

const HeaderCell = styled.span`
  padding: 5px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
  cursor: pointer;
  transition: color 0.3s ease;
  user-select: none;
  &:hover {
    color: var(--yellow);
  }

  @media screen and (max-width: 768px) {
    padding: 2px;
  }
`;

const SortIcon = styled.div`
  width: 18px;
`;
