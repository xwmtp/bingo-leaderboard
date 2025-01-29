import styled from "styled-components";
import {RaceResult} from "./playerData.ts";
import {TableData} from "../../../../genericComponents/table/TableTypes.ts";
import {useSortedEntries} from "../../../../genericComponents/table/sort/useSortedEntries.ts";
import {TableHeader} from "../../../../genericComponents/table/TableHeader.tsx";
import {TableRow, TableWrapper} from "../../../../genericComponents/table/TableComponents.tsx";

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
                <RowCell key={column.key.toString()}>
                  {column.format?.(data as never) ?? data?.toString()}
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
  gap: 4px;
`;

const TableRowStyled = styled(TableRow)<{$isDropped: boolean}>`
  border-radius: 10px;
  background-color: var(--row-color);
  color: ${({$isDropped}) => ($isDropped ? "white" : "inherit")};
  opacity: ${({$isDropped}) => ($isDropped ? 0.4 : 1)};
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
