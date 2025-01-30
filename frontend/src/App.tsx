import styled from "styled-components";
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "./genericComponents/Header.tsx";
import {getBingoLeaderboard} from "./api/bingoLeaderboardApi.ts";
import {useQuery} from "@tanstack/react-query";
import {Page} from "./genericComponents/Page.tsx";

export function App() {
  const leaderboardDataResult = useQuery({
    queryKey: ["getBingoLeaderboard"],
    queryFn: () => getBingoLeaderboard(),
  });

  return (
    <AppDiv id="app">
      <Router>
        <Header dateTime={leaderboardDataResult.data?.lastUpdated} />
        <Page leaderboardDataResult={leaderboardDataResult} />
      </Router>
    </AppDiv>
  );
}

const AppDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
`;
