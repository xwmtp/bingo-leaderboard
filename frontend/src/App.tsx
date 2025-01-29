import styled from "styled-components";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Header} from "./genericComponents/Header.tsx";
import {AboutPage} from "./pages/about/AboutPage.tsx";
import {Footer} from "./genericComponents/Footer.tsx";
import {LeaderboardPage} from "./pages/mainLeaderboard/LeaderboardPage.tsx";
import {getBingoLeaderboard} from "./api/bingoLeaderboardApi.ts";
import {useQuery} from "@tanstack/react-query";
import {NotFound} from "./genericComponents/NotFound.tsx";

export function App() {
  const {data: leaderboardData} = useQuery({
    queryKey: ["getBingoLeaderboard"],
    queryFn: () => getBingoLeaderboard(),
  });

  return (
    <AppDiv id="app">
      <Router>
        <Header dateTime={leaderboardData?.lastUpdated} />
        <Routes>
          <Route
            path="/bingo-leaderboard-frontend"
            element={<LeaderboardPage leaderboardData={leaderboardData} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AppDiv>
  );
}

const AppDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
`;
