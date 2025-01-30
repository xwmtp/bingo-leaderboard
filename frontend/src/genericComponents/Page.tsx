import {UseQueryResult} from "@tanstack/react-query";
import {BingoLeaderboardData} from "../api/dataModels/bingoLeaderboardModels.ts";
import {Spinner} from "./Spinner.tsx";
import {Route, Routes} from "react-router-dom";
import {LeaderboardPage} from "../pages/mainLeaderboard/LeaderboardPage.tsx";
import {AboutPage} from "../pages/about/AboutPage.tsx";
import {NotFound} from "./NotFound.tsx";
import {Footer} from "./Footer.tsx";
import styled from "styled-components";

export const Page: React.FC<{leaderboardDataResult: UseQueryResult<BingoLeaderboardData>}> = ({
  leaderboardDataResult,
}) => {
  if (leaderboardDataResult.isPending) {
    return <Spinner />;
  }

  if (leaderboardDataResult.isError) {
    return (
      <NoData>
        Could not fetch leaderboard data. Please try again later, or message{" "}
        <strong>xwillmarktheplace</strong> on Discord if the problem persists.
      </NoData>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/bingo-leaderboard"
          element={<LeaderboardPage leaderboardData={leaderboardDataResult.data} />}
        />
        <Route path="bingo-leaderboard/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

const NoData = styled.span`
  max-width: 38rem;
`;
