import {RowDataWithIndex} from "../TableTypes.ts";

export type SortDirection = "asc" | "desc";

export type DefaultSortable = string | number | boolean | bigint;

export const isDefaultSortable = (value: unknown): value is DefaultSortable => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  );
};

export const defaultSort = (a: DefaultSortable, b: DefaultSortable, direction: SortDirection) => {
  if (typeof a === "string" && typeof b === "string") {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }
  if (a < b) return direction === "asc" ? -1 : 1;
  if (a > b) return direction === "asc" ? 1 : -1;
  return 0;
};

export type SortConfig<T extends RowDataWithIndex> = {
  columnKey: keyof T;
  direction: SortDirection;
} | null;
