import {TableData} from "../../genericComponents/table/TableTypes.ts";
import {LeaderboardEntry} from "../../pages/mainLeaderboard/components/LeaderboardTypes.ts";
import {ApiBingoLeaderboard} from "./apiBingoLeaderboardModels.ts";
import {toLeaderboardTableData} from "../../pages/mainLeaderboard/components/leaderboardData.ts";

export interface BingoLeaderboardData {
  lastUpdated: string;
  numEntries: number;
  tableData: TableData<LeaderboardEntry>;
}

export function mapToBingoLeaderboardData(data: ApiBingoLeaderboard) {
  return {
    lastUpdated: data.lastUpdated,
    numEntries: data.numEntries,
    tableData: toLeaderboardTableData(data.entries),
  };
}
