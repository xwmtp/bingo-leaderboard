import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { AboutPage } from "./components/AboutPage";
import { Footer } from "./components/Footer";
import { LastUpdated } from "./components/UpdatedText";
import { LeaderboardPage } from "./components/leaderboardPage/LeaderboardPage";
import { getBingoLeaderboard } from "./service/bingoLeaderboardApi";
import { BingoLeaderboard } from "./service/dataModels/bingoLeaderboardModels";

export function App() {
  const [leaderboardData, setLeaderboardData] = useState<BingoLeaderboard | undefined>(undefined);

  useEffect(() => {
    getBingoLeaderboard()
      .then((leaderboardData) => {
        setLeaderboardData(leaderboardData);
      })
      .catch((error) => {
        setLeaderboardData(undefined);
        console.error(error);
      });
  });

  const timestamp = leaderboardData === undefined ? undefined : leaderboardData.lastUpdated;

  return (
    <AppDiv id="app">
      <Router>
        <LastUpdated timestamp={timestamp} />
        <Header />
        <Routes>
          <Route path="/" element={<LeaderboardPage leaderboardData={leaderboardData} />} />
          <Route path="/about" element={<AboutPage />} />
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
`;
