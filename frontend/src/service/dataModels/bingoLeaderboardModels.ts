export interface BingoLeaderboard {
  lastUpdated: string;
  numEntries: number;
  entries: BingoLeaderboardEntry[];
}

interface BingoLeaderboardEntry {
  playerName: string;
  playerId: string;
  racetimePoints: number;
  leaderboardScore: number;
  leaderboardTime: string;
  average: string;
  effectiveAverage: string;
  effectiveMedian: string;
  lastRaced: string;
  finishedRacesCount: number;
  includedRacesCount: number;
  finishedRacesFraction: string;
  rank: number;
}

export type BingoLeaderboardPlayers = BingoLeaderboardPlayer[];

export interface BingoLeaderboardPlayer {
  name: string;
  id: string;
  leaderboardEntry: BingoLeaderboardEntry;
  results: BingoLeaderboardResult[];
}

export interface BingoLeaderboardResult {
  slug: string;
  time: string;
  agedTime: string;
  forfeit: false;
  date: string;
  comment: string;
  dropped: false;
}
