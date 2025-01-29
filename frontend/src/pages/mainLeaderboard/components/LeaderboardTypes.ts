import {RowDataWithIndex} from "../../../genericComponents/table/TableTypes.ts";

export type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  time: string;
  seen: number;
  finished: string;
} & RowDataWithIndex;
