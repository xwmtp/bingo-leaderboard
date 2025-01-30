import styled from "styled-components";
import {RaceResult} from "./playerData.ts";
import {TableData} from "../../../../genericComponents/table/TableTypes.ts";
import {useSortedEntries} from "../../../../genericComponents/table/sort/useSortedEntries.ts";
import {TableHeader} from "../../../../genericComponents/table/TableHeader.tsx";
import {
  RowCell,
  TableRow,
  TableWrapper,
} from "../../../../genericComponents/table/TableComponents.tsx";

interface Props {
  tableData: TableData<RaceResult>;
}

export function PlayerTable({tableData}: Props) {
  const {sortedEntries, sortConfig, handleSort} = useSortedEntries(tableData);
  const {columns} = tableData;

  return (
    <TableStyled $numColumns={columns.length}>
      <TableHeader columns={columns} sortConfig={sortConfig} handleSort={handleSort} />

      {sortedEntries.map((entry) => {
        return (
          <TableRowStyled
            as="a"
            key={entry.index}
            href={`https://racetime.gg/${entry.slug}`}
            target="_blank"
            rel="noreferrer"
            $isDropped={entry.dropped}
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
  row-gap: 0.3rem;
  column-gap: 1.3rem;
`;

const TableRowStyled = styled(TableRow)<{$isDropped: boolean}>`
  color: ${({$isDropped}) => ($isDropped ? "white" : "inherit")};
  opacity: ${({$isDropped}) => ($isDropped ? 0.4 : 1)};
`;

const RowCellStyled = styled(RowCell)``;
