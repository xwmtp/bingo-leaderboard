import styled from "styled-components";
import {useSortedEntries} from "./sort/useSortedEntries.ts";
import {TableHeader} from "./TableHeader.tsx";
import {RowDataWithIndex, TableData} from "./TableTypes.ts";

interface Props<TRowData extends RowDataWithIndex> {
  tableData: TableData<TRowData>;
  onRowClick?: (row: TRowData) => void;
}

export function Table<TRowData extends RowDataWithIndex>({tableData, onRowClick}: Props<TRowData>) {
  const {sortedEntries, sortConfig, handleSort} = useSortedEntries(tableData);
  const {columns} = tableData;

  return (
    <GridWrapper>
      <TableHeader columns={columns} sortConfig={sortConfig} handleSort={handleSort} />

      {sortedEntries.map((entry) => {
        return (
          <GridRow key={entry.index} onClick={() => onRowClick?.(entry)}>
            {columns.map((column) => {
              const data = entry[column.key];
              return (
                <RowCell key={column.key.toString()}>
                  {column.format?.(data) ?? data?.toString()}
                </RowCell>
              );
            })}
          </GridRow>
        );
      })}
    </GridWrapper>
  );
}

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 4px;
`;

const GridRow = styled.div`
  grid-column-start: 1;
  grid-column-end: end;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  border-radius: 10px;
  background-color: var(--row-color);
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 2px 4px;

  &:hover {
    background-color: var(--highlight-color);
  }
`;

const RowCell = styled.span`
  padding: 5px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
