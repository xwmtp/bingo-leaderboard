import styled from "styled-components";
import React from "react";
import LeaderboardTable from "./LeaderboardTable";
import PlayerTable from "./PlayerTable";
import "./TableTheme.js";

class LeaderboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            leaderboardData: [],
            playerData: [],
            currentPlayer: ""
        }
        this.requestLeaderboardData()
        this.updateCurrentPlayer = this.updateCurrentPlayer.bind(this);

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

    updateCurrentPlayer(row) {
        this.setState({ currentPlayer: row.playerName });
        console.log(row)
        console.log(`new player: ${row.playerName}`)
    }

    render() {
        let playerTableData;
        if (this.state.playerData.length > 0 && this.state.currentPlayer != "") {
            console.log(this.state.currentPlayer)
            console.log(this.state.playerData)
            playerTableData = this.state.playerData.find(p => p.name == this.state.currentPlayer)
        } else {
            playerTableData = { name: "", results: [] }
        }
        return (
            <this.LeaderboardPageDiv id='leaderboard-page'>
                <LeaderboardTable data={this.state.leaderboardData} onRowClick={this.updateCurrentPlayer}/>
                <PlayerTable data={playerTableData}  />
            </this.LeaderboardPageDiv>
        );
    }
}

export default LeaderboardPage;