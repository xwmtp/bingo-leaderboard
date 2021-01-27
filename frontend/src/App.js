import styled from "styled-components";
import Header from "./components/Header";
import LeaderboardPage from "./components/leaderboard/LeaderboardPage";

const AppDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <AppDiv id="app">
      <div className="App">
        <Header />
        <LeaderboardPage/>
      </div>
    </AppDiv>
  );
}

export default App;
