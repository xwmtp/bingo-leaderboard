import {SortDirection} from "./sort/sortUtils.ts";

export type TableData<RowData extends RowDataWithIndex> = {
  columns: {
    [Key in keyof RowData]: Column<RowData, Key>;
  }[keyof RowData][];
  rows: RowData[];
};

/**
 * @property index - Each row needs a unique index for the table to work properly
 */
export type RowDataWithIndex = {
  index: number;
};

export type Column<RowData, Key extends keyof RowData> = {
  key: Key;
  displayName: string;
  format?: (value: RowData[Key]) => string;
  customSort?: (a: RowData[Key], b: RowData[Key], direction: SortDirection) => number;
};
