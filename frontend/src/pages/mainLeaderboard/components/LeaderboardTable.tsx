import {RowDataWithIndex, TableData} from "../../../genericComponents/table/TableTypes.ts";
import {useSortedEntries} from "../../../genericComponents/table/sort/useSortedEntries.ts";
import {TableHeader} from "../../../genericComponents/table/TableHeader.tsx";
import styled from "styled-components";
import {TableRow, TableWrapper} from "../../../genericComponents/table/TableComponents.tsx";

interface Props<TRowData extends RowDataWithIndex> {
  tableData: TableData<TRowData>;
  onRowClick?: (row: TRowData) => void;
}

export function LeaderboardTable<TRowData extends RowDataWithIndex>({
  tableData,
  onRowClick,
}: Props<TRowData>) {
  const {sortedEntries, sortConfig, handleSort} = useSortedEntries(tableData);
  const {columns} = tableData;

  return (
    <TableStyled $numColumns={columns.length}>
      <TableHeader columns={columns} sortConfig={sortConfig} handleSort={handleSort} />

      {sortedEntries.map((entry) => {
        return (
          <TableRowStyled key={entry.index} onClick={() => onRowClick?.(entry)}>
            {columns.map((column) => {
              const data = entry[column.key];
              return (
                <RowCell key={column.key.toString()}>
                  {column.format?.(data) ?? data?.toString()}
                </RowCell>
              );
            })}
          </TableRowStyled>
        );
      })}
    </TableStyled>
  );
}

const TableStyled = styled(TableWrapper)`
  width: 100%;
  gap: 4px;
`;

const TableRowStyled = styled(TableRow)`
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

  @media screen and (max-width: 768px) {
    padding: 2px;
  }
`;
