import {TableData} from "../../../genericComponents/table/TableTypes.ts";
import {useSortedEntries} from "../../../genericComponents/table/sort/useSortedEntries.ts";
import {TableHeader} from "../../../genericComponents/table/TableHeader.tsx";
import styled from "styled-components";
import {
  RowCell,
  TableRow,
  TableWrapper,
} from "../../../genericComponents/table/TableComponents.tsx";
import {Colors} from "../../../style/GlobalStyle.tsx";
import {LeaderboardEntry} from "./LeaderboardTypes.ts";

interface Props {
  tableData: TableData<LeaderboardEntry>;
  selectedPlayerName?: string;
  onRowClick?: (row: LeaderboardEntry) => void;
}

export function LeaderboardTable({tableData, selectedPlayerName, onRowClick}: Props) {
  const {sortedEntries, sortConfig, handleSort} = useSortedEntries(tableData);
  const {columns} = tableData;

  return (
    <TableStyled $numColumns={columns.length}>
      <TableHeader columns={columns} sortConfig={sortConfig} handleSort={handleSort} />

      {sortedEntries.map((entry) => {
        return (
          <TableRowStyled
            key={entry.index}
            onClick={() => onRowClick?.(entry)}
            $isSelected={selectedPlayerName === entry.name}
          >
            {columns.map((column) => {
              const data = entry[column.key];
              return (
                <RowCellStyled key={column.key.toString()}>
                  {column.format?.(data as never) ?? data?.toString()}
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

const TableRowStyled = styled(TableRow)<{$isSelected: boolean}>`
  background-color: ${({$isSelected}) => ($isSelected ? Colors.highlightColor : "auto")};
`;

const RowCellStyled = styled(RowCell)``;
