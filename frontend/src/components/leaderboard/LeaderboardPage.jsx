import styled from "styled-components";
import React from "react";
import LeaderboardTable from "./LeaderboardTable";
import PlayerTable from "./PlayerTable";
import "./TableTheme.js";

class LeaderboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, leaderboardData: [], playerData: [] }
        this.requestLeaderboardData()
 
    }

    LeaderboardPageDiv = styled.div`
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        justify-content: space-evenly;
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
        }).catch(() => console.log("Could not download leaderboard data."))
        .then(() => this.requestPlayerData());
    }


    requestPlayerData() {
        this.setState({ loading: true })
        fetch(encodeURI(`${process.env.REACT_APP_BACKEND_URL}/players`), {
            method: "get",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(r => {
            if (r.status / 100 !== 2) {
                this.setState({ loading: false, playerData: [] })
                throw Error(r.status);
            }
            return r.json();
        }).then(playerData => {
            this.setState({ loading: false, playerData: playerData });
        }).catch(() => console.log("Could not download player data."));
    }

    render() {
        console.log(JSON.stringify(this.state))
        const playerTableData = this.state.playerData.length > 0? this.state.playerData[0].results : {}
        return (
            <this.LeaderboardPageDiv id='leaderboard-page'>
                <LeaderboardTable data={this.state.leaderboardData} />
                <PlayerTable data={playerTableData}/>
            </this.LeaderboardPageDiv>
        );
    }
}

export default LeaderboardPage;