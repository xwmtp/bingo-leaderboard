// Types expected from the backend

export interface ApiBingoLeaderboard {
  lastUpdated: string;
  numEntries: number;
  entries: ApiBingoLeaderboardEntry[];
}

export interface ApiBingoLeaderboardEntry {
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

export type ApiBingoLeaderboardPlayers = ApiBingoLeaderboardPlayer[];

export interface ApiBingoLeaderboardPlayer {
  name: string;
  id: string;
  leaderboardEntry: ApiBingoLeaderboardEntry;
  results: ApiBingoLeaderboardResult[];
}

export interface ApiBingoLeaderboardResult {
  slug: string;
  time: string;
  agedTime: string;
  forfeit: false;
  date: string;
  comment: string;
  dropped: false;
}
