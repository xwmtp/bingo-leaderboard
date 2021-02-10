import styled from "styled-components";
import React from "react";
import LeaderboardBlock from "./leaderboard/LeaderboardBlock";
import PlayerBlock from "./player/PlayerBlock";
import "./TableTheme.js";

class LeaderboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            leaderboardData: undefined,
            playerData: [],
            currentPlayer: ""
        }
        console.log('leaderboard page constructor!')
        this.updateCurrentPlayer = this.updateCurrentPlayer.bind(this);
    }

    LeaderboardPageDiv = styled.div`
        display: flex;
        width: 100%;
        flex-grow: 1;
        flex-direction: row;
        justify-content: center;
        //border: 1px solid green;
    `

    NoDataDiv = styled.div`
        display: flex;
        margin-top: 100px;
        height: 100%;
        //border 1px solid green;
    `

    EmptyDiv = styled.div`
        display: flex;
        height: 100%;
        //border 1px solid green;
    `

    componentDidMount() {
        this.requestPlayerData();
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

    getPlayerTableData() {
        let playerTableData;
        if (this.state.playerData.length > 0 && this.state.currentPlayer !== "") {
            console.log(this.state.currentPlayer)
            console.log(this.state.playerData)
            playerTableData = this.state.playerData.find(p => p.name === this.state.currentPlayer)
        } else {
            playerTableData = { name: "", leaderboardEntry: [], results: [] }
        }
        return playerTableData;
    }

    render() {
        let pageContent;
        console.log(this.props.data)
        if (this.props.data === undefined) {
            pageContent = <this.EmptyDiv id="empty" />
        } else if (this.props.data.length === 0) {
            pageContent = <this.NoDataDiv id="no-data">
                <p>Currently no data available.</p>
            </this.NoDataDiv>
        }
        else {
            const playerTableData = this.getPlayerTableData();
            pageContent =
                <this.LeaderboardPageDiv id='leaderboard-page'>

                    <LeaderboardBlock data={this.props.data} onRowClick={this.updateCurrentPlayer} />
                    <PlayerBlock data={playerTableData} />
                </this.LeaderboardPageDiv>
        }
        return (
            pageContent
        );
    }
}

export default LeaderboardPage;

/*                     <this.LastUpdatedDiv>
                        <p>Last updated: {Moment(this.state.leaderboardData.lastUpdated).format("LT, MMM Do YYYY ")}</p>
                    </this.LastUpdatedDiv> */