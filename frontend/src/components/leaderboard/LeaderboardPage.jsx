import styled from "styled-components";
import React from "react";
import Table from "./Table";

class LeaderboardPage extends React.Component {

    constructor(props) {
        super(props);
    }

    LeaderboardDiv = styled.div`
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
    `

    render() {
        return (
            <this.LeaderboardDiv id='leaderboard-div'>
                <Table />
            </this.LeaderboardDiv>
        );
    }
}

export default LeaderboardPage;