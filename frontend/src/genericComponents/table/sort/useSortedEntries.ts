import {useCallback, useEffect, useState} from "react";
import {RowDataWithIndex, TableData} from "../TableTypes.ts";
import {defaultSort, isDefaultSortable, SortConfig, SortDirection} from "./sortUtils.ts";

export function useSortedEntries<TRowData extends RowDataWithIndex>(
  tableData: TableData<TRowData>,
) {
  const {rows: entries, columns} = tableData;
  const [sortedEntries, setSortedEntries] = useState(entries);
  const [sortConfig, setSortConfig] = useState<SortConfig<TRowData>>(null);

  useEffect(() => {
    setSortConfig(null);
    setSortedEntries(entries);
  }, [entries]);

  const handleSort = useCallback(
    (key: keyof TRowData) => {
      const newSortDirection = calculateNewSortDirection(key, sortConfig);
      if (newSortDirection === null) {
        // reset all sorting
        setSortConfig(null);
        setSortedEntries(entries);
        return;
      }

      const sorted = [...sortedEntries].sort((a, b) => {
        const column = columns.find((column) => column.key === key);
        if (!column) {
          console.warn(`Could not sort; could not find column with key ${key.toString()}`);
          return 0;
        }
        if (column.customSort) {
          return column.customSort(a[key], b[key], newSortDirection);
        }
        if (isDefaultSortable(a[key]) && isDefaultSortable(b[key])) {
          return defaultSort(a[key], b[key], newSortDirection);
        }
        console.warn(
          `Could not sort column ${key.toString()} with default sorting, supply a custom sort function.`,
        );
        return 0;
      });
      setSortedEntries(sorted);
      setSortConfig({columnKey: key, direction: newSortDirection});
    },
    [columns, entries, sortConfig, sortedEntries],
  );

  return {
    sortedEntries,
    handleSort,
    sortConfig,
  };
}

function calculateNewSortDirection<TRowData extends RowDataWithIndex>(
  key: keyof TRowData,
  sortConfig: SortConfig<TRowData>,
): SortDirection | null {
  if (!sortConfig || sortConfig.columnKey !== key) {
    return "asc";
  }
  if (sortConfig.direction === "asc") {
    return "desc";
  }
  return null;
}
