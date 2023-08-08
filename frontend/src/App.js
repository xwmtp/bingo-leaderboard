import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { AboutPage } from "./components/AboutPage";
import { Footer } from "./components/Footer";
import { LastUpdated } from "./components/UpdatedText";
import { LeaderboardPage } from "./components/leaderboardPage/LeaderboardPage";

export function App() {
  const [leaderboardData, setLeaderboardData] = useState(undefined);

  useEffect(() => {
    fetch(encodeURI(`${process.env.REACT_APP_BACKEND_URL}/leaderboard`), {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (r.status / 100 !== 2) {
          setLeaderboardData([]);
          throw Error(r.status);
        }
        return r.json();
      })
      .then((leaderboardData) => {
        setLeaderboardData(leaderboardData);
      })
      .catch(() => {
        setLeaderboardData([]);
        console.log("Something went wrong while fetching the leaderboard data");
      });
  });

  const timestamp = leaderboardData === undefined ? undefined : leaderboardData.lastUpdated;

  return (
    <AppDiv id="app">
      <Router>
        <LastUpdated timestamp={timestamp} />
        <Header id="header" />
        <Routes>
          <Route path="/" element={<LeaderboardPage leaderboardData={leaderboardData} />} />
          <Route path="/about" component={AboutPage} />
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
