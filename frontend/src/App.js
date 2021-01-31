import styled from "styled-components";
import Header from "./components/Header";
import LeaderboardPage from "./components/leaderboardPage/LeaderboardPage";

const AppDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <AppDiv id="app">
        <Header />
        <LeaderboardPage/>
    </AppDiv>
  );
}

export default App;
