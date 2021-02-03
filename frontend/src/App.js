import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeaderboardPage from "./components/leaderboardPage/LeaderboardPage";
import AboutPage from "./components/AboutPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const AppDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  return (
    <AppDiv id="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={LeaderboardPage} exact />
          <Route path="/about" component={AboutPage} />
        </Switch>
        <Footer />
      </Router>
    </AppDiv>
  );
}

export default App;
