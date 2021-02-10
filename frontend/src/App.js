import styled from "styled-components";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeaderboardPage from "./components/leaderboardPage/LeaderboardPage";
import AboutPage from "./components/AboutPage";
import LastUpdated from "./components/UpdatedText"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      leaderboardData: undefined,
    }
  }

  AppDiv = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  componentDidMount() {
    this.requestLeaderboardData();
  }

  requestLeaderboardData() {
    console.log("Requesting leaderboard data....")
    this.setState({ loading: true })
    fetch(encodeURI(`${process.env.REACT_APP_BACKEND_URL}/leaderboard`), {
      method: "get",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(r => {
      if (r.status / 100 !== 2) {
        this.setState({ loading: false, leaderboardData: [] })
        throw Error(r.status);
      }
      return r.json();
    }).then(leaderboardData => {
      console.log('leaderboard data is')
      console.log(leaderboardData)
      this.setState({ loading: false, leaderboardData: leaderboardData });
    }).catch(() => {
      console.log("Could not download leaderboard data.")
      this.setState({ loading: false, leaderboardData: [] })
    });
  }

  render() {
    const timestamp = this.state.leaderboardData === undefined ? undefined : this.state.leaderboardData.lastUpdated;

    return (
      <this.AppDiv id="app" >
        <Router>

          <Header id="header"/>
          <Switch>
            <Route exact path="/" render={(props) => <LeaderboardPage {...props} data={this.state.leaderboardData} />} />
            <Route path="/about" component={AboutPage} />
          </Switch>
          <Footer />
        </Router>
      </this.AppDiv>
    )
  };
}

export default App;
