import React from "react";
import styled from "styled-components";
import DataTable from 'react-data-table-component';
import ReactTimeAgo from 'react-time-ago'
import { customStyles } from '../TableTheme.js'

class LeaderboardBlock extends React.Component {

    LeaderboardDiv = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 45%;
        max-width: 700px;
        margin-right: 20px;
        //border: solid grey 1px;
    `

    TableDiv = styled.div`
        height: 100%;
        font-size: 16px;
    `

    columns = [
        {
            name: 'Rank',
            selector: 'rank',
            sortable: true,
            width: '60px',
            center: true,

        },
        {
            name: 'Name',
            selector: 'playerName',
            sortable: true,
            minWidth: '170px',
            center: true,
            sortFunction: (a, b) => {
                a = a.playerName.toLowerCase();
                b = b.playerName.toLowerCase();
                return a === b ? 0 : a > b ? 1 : -1;
            }
        },
        {
            name: 'Score',
            selector: 'leaderboardScore',
            width: '60px',
            sortable: true,
            center: true,

        },
        {
            name: 'Median',
            selector: 'effectiveMedian',
            width: '90px',
            sortable: true,
            hide: 1200,
            center: true,
        },
        {
            name: 'Last seen',
            selector: 'lastRaced',
            width: '80px',
            sortable: true,
            format: (row, idx) => <ReactTimeAgo date={new Date(row.lastRaced)} timeStyle="mini-minute" />,//.replace(' ago', ''),
            hide: 1200,
            right: true
        },
        {
            name: 'Finished',
            selector: 'finishedRacesFraction',
            sortable: false,
            center: true,
        },
    ];


    render() {
        console.log("In leaderboard table:")
        console.log(this.props.data)
        return (
            <this.LeaderboardDiv id="leaderboard-div">
                <this.TableDiv>
                    <DataTable
                        title="Leaderboard"
                        columns={this.columns}
                        data={this.props.data.entries}
                        theme='bingo'
                        customStyles={customStyles}
                        noHeader='true'
                        onRowClicked={this.props.onRowClick}
                        pointerOnHover={true}
                    />
                </this.TableDiv>
            </this.LeaderboardDiv>
        );
    }
}

export default LeaderboardBlock;