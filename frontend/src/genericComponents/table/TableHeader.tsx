import {RowDataWithIndex, TableData} from "./TableTypes.ts";
import styled from "styled-components";
import {SortConfig} from "./sort/sortUtils.ts";
import {HeaderCell, HeaderRow} from "./TableComponents.tsx";

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

const SortIcon = styled.div`
  width: 1.2rem;
`;
