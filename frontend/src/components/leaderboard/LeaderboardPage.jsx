import styled from "styled-components";
import React from "react";
import Table from "./Table";

class LeaderboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, leaderboardData: [] }
        this.requestLeaderboardData();
        console.log(this.state)
        console.log(this.state.leaderboardData)
    }

    LeaderboardDiv = styled.div`
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
    `

    requestLeaderboardData() {
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
            this.setState({ loading: false, leaderboardData: leaderboardData });
        }).catch(() => console.log("Could not download leaderboard data."));
    }

    render() {
        return (
            <this.LeaderboardDiv id='leaderboard-div'>
                <Table data={this.state.leaderboardData} />
            </this.LeaderboardDiv>
        );
    }
}

export default LeaderboardPage;