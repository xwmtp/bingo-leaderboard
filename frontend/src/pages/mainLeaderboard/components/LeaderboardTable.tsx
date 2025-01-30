import {RowDataWithIndex, TableData} from "../../../genericComponents/table/TableTypes.ts";
import {useSortedEntries} from "../../../genericComponents/table/sort/useSortedEntries.ts";
import {TableHeader} from "../../../genericComponents/table/TableHeader.tsx";
import styled from "styled-components";
import {
  RowCell,
  TableRow,
  TableWrapper,
} from "../../../genericComponents/table/TableComponents.tsx";

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
                <RowCellStyled key={column.key.toString()}>
                  {column.format?.(data) ?? data?.toString()}
                </RowCellStyled>
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
  row-gap: 0.3rem;
  column-gap: 0.4rem;
`;

const TableRowStyled = styled(TableRow)``;

const RowCellStyled = styled(RowCell)``;
