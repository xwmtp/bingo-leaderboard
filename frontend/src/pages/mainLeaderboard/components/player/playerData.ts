import {TableData} from "../../../../genericComponents/table/TableTypes.ts";
import {
  ApiBingoLeaderboardEntry,
  ApiBingoLeaderboardPlayer,
  ApiBingoLeaderboardResult,
} from "../../../../api/dataModels/apiBingoLeaderboardModels.ts";
import {DateTime} from "luxon";

export interface BingoPlayer {
  name: string;
  id: string;
  leaderboardEntry: ApiBingoLeaderboardEntry;
  results: RaceResult[];
}

export interface RaceResult {
  index: number;
  slug: string;
  time: string;
  agedTime: string;
  date: string;
  comment: string;
  dropped: false;
}

export function mapToPlayerData(apiPlayer: ApiBingoLeaderboardPlayer): BingoPlayer {
  return {
    name: apiPlayer.name,
    id: apiPlayer.id,
    leaderboardEntry: apiPlayer.leaderboardEntry,
    results: mapToRaceResults(apiPlayer.results),
  };
}

function mapToRaceResults(apiResults: ApiBingoLeaderboardResult[]): RaceResult[] {
  return apiResults.map((apiResult, index) => {
    return {
      index: index,
      time: apiResult.time,
      agedTime: apiResult.agedTime,
      date: apiResult.date,
      comment: apiResult.comment,
      dropped: apiResult.dropped,
      slug: apiResult.slug,
    };
  });
}

const playerColumns: TableData<RaceResult>["columns"] = [
  {key: "time", displayName: "Time"},
  {key: "agedTime", displayName: "Aged"},
  {
    key: "date",
    displayName: "When",
    format: (iso) => DateTime.fromISO(iso).toRelative({style: "long", locale: "en-US"}) ?? "?",
  },
  {key: "comment", displayName: "Comment"},
];

export function toPlayerTableData(playerResults: RaceResult[]): TableData<RaceResult> {
  return {
    columns: playerColumns,
    rows: playerResults,
  };
}
