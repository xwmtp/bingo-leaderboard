import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
        <Footer/>
    </AppDiv>
  );
}

export default App;
