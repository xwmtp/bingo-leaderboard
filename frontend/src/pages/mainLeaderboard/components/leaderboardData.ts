import {DateTime} from "luxon";
import {LeaderboardEntry} from "./LeaderboardTypes.ts";
import {TableData} from "../../../genericComponents/table/TableTypes.ts";
import {ApiBingoLeaderboardEntry} from "../../../api/dataModels/apiBingoLeaderboardModels.ts";

export const leaderboardColumns: TableData<LeaderboardEntry>["columns"] = [
  {key: "rank", displayName: "Rank"},
  {key: "name", displayName: "Name"},
  {key: "score", displayName: "Score"},
  {key: "time", displayName: "Time"},
  {
    key: "seen",
    displayName: "Seen",
    format: (seen) => DateTime.fromMillis(seen).toRelative({style: "long", locale: "en-US"}) ?? "?",
  },
  {
    key: "finished",
    displayName: "Finished",
    customSort: (a, b, direction) => {
      const [numA, denomA] = a.split("/").map(Number);
      const [numB, denomB] = b.split("/").map(Number);
      const completionRateA = numA / denomA;
      const completionRateB = numB / denomB;
      let compareValue = 0;
      if (completionRateA > completionRateB) compareValue = -1;
      if (completionRateA < completionRateB) compareValue = 1;
      if (completionRateA === completionRateB) compareValue = denomB - denomA;
      if (direction === "desc") compareValue *= -1;
      return compareValue;
    },
  },
];

export function toLeaderboardTableData(
  apiEntries: ApiBingoLeaderboardEntry[],
): TableData<LeaderboardEntry> {
  return {
    columns: leaderboardColumns,
    rows: apiEntries.map((apiEntry) => {
      return {
        index: apiEntry.rank,
        rank: apiEntry.rank,
        name: apiEntry.playerName,
        finished: apiEntry.finishedRacesFraction,
        seen: DateTime.fromISO(apiEntry.lastRaced).toMillis(),
        time: apiEntry.leaderboardTime,
        score: apiEntry.leaderboardScore,
      };
    }),
  };
}

// const testData = [
//   {
//     index: 1,
//     rank: 1,
//     name: "Kintefleush",
//     score: 995,
//     time: "1:05:00",
//     seen: 1725192911000,
//     finished: "7/7",
//   },
//   {
//     index: 2,
//     rank: 2,
//     name: "scaramanga",
//     score: 930,
//     time: "1:09:00",
//     seen: 1714565711000,
//     finished: "15/15",
//   },
//   {
//     index: 3,
//     rank: 3,
//     name: "jenslang",
//     score: 911,
//     time: "1:10:00",
//     seen: 1682943311000,
//     finished: "6/8",
//   },
//   {
//     index: 4,
//     rank: 4,
//     name: "xwillmarktheplace",
//     score: 879,
//     time: "1:15:04",
//     seen: 1734592911000,
//     finished: "14/15",
//   },
// ];
