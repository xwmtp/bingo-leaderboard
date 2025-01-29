import {fetchData} from "./api.ts";
import {
  BingoLeaderboardData,
  mapToBingoLeaderboardData,
} from "./dataModels/bingoLeaderboardModels.ts";
import {
  BingoPlayer,
  mapToPlayerData,
} from "../pages/mainLeaderboard/components/player/playerData.ts";
import {
  ApiBingoLeaderboard,
  ApiBingoLeaderboardPlayers,
} from "./dataModels/apiBingoLeaderboardModels.ts";

export const getBingoLeaderboard = async (): Promise<BingoLeaderboardData> => {
  const data: ApiBingoLeaderboard = await fetchLeaderboardData("leaderboard");
  return mapToBingoLeaderboardData(data);
};

export const getBingoPlayers = async (): Promise<BingoPlayer[]> => {
  const data: ApiBingoLeaderboardPlayers = await fetchLeaderboardData("players");
  return data.map(mapToPlayerData);
};

const fetchLeaderboardData = async (endpoint: string) => {
  return fetchData(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${endpoint}`);
};
