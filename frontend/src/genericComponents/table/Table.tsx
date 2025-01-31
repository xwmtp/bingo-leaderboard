import styled from "styled-components";
import {useSortedEntries} from "./sort/useSortedEntries.ts";
import {TableHeader} from "./TableHeader.tsx";
import {RowDataWithIndex, TableData} from "./TableTypes.ts";
import {Colors} from "../../style/GlobalStyle.tsx";

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
  gap: 0.3rem;
`;

const GridRow = styled.div`
  grid-column-start: 1;
  grid-column-end: end;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  border-radius: 0.7rem;
  background-color: ${Colors.rowColor};
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 0.1rem 0.3rem;

  &:hover {
    background-color: ${Colors.highlightColor};
  }
`;

const RowCell = styled.span`
  padding: 0.3rem 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
