import { fetchData } from "./api";
import { BingoLeaderboard, BingoLeaderboardPlayers } from "./dataModels/bingoLeaderboardModels";

export const getBingoLeaderboard = async (): Promise<BingoLeaderboard> => {
  return await fetchLeaderboardData("leaderboard");
};

export const getBingoPlayers = async (): Promise<BingoLeaderboardPlayers> => {
  return fetchLeaderboardData("players");
};

const fetchLeaderboardData = async (endpoint: string) => {
  return fetchData(`${process.env.REACT_APP_BACKEND_URL}/${endpoint}`);
};
