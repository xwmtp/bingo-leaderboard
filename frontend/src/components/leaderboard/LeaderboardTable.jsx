import React from "react";
import styled from "styled-components";
import DataTable, { createTheme } from 'react-data-table-component';

const LeaderboardDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 45%;
    border: solid white 1px;
`

const TableDiv = styled.div`
    height: 100%;
    font-size: 16px;
    border: solid green 1px;
`

/*const data = [
    {
        id:1,
        playerName: "Timato",
        racetimePoints: 3281,
        leaderboardScore: 903,
        leaderboardTime: "1:10:34",
        effectiveMedian: "1:11:57",
        average: "1:12:26",
        lastRaced: "Jan 23, 2021",
        finishedRacesCount: 15,
        includedRacesCount: 15
    },
    {
        id:2,
        playerName: "juwk",
        racetimePoints: 3323,
        leaderboardScore: 897,
        leaderboardTime: "1:10:58",
        effectiveMedian: "1:11:10",
        average: "1:11:40",
        lastRaced: "Jan 16, 2021",
        finishedRacesCount: 14,
        includedRacesCount: 15
    }
]*/

createTheme('bingo', {
    text: {
        primary: `#11111`,
        secondary: '#2aa198',
    },
    background: {
        default: '#111111',
    },
    divider: {
        default: '#46484b',
    },
    highlightOnHover: {
        default: '#181818',
        text: '#f7e279',
    },
    sortFocus: {
        default: '#f7e279',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});

const customStyles = {
    header: {
        style: {
            justifyContent: 'center',
        }
    },
    headCells: {
        style: {
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#f7e279',
            justifyContent: 'center',
            paddingLeft: '35px',
        }

    },
    rows: {
        style: {
            fontSize: '15px',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '40px',
        }

    }
}


const columns = [
    {
        name: 'time',
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
    },
    {
        name: 'Score',
        selector: 'leaderboardScore',
        sortable: true,
        center: true,

    },
    {
        name: 'Average',
        selector: 'average',
        sortable: true,
        center: true,
    },
    {
        name: 'Finished',
        selector: 'finishedRacesFraction',
        sortable: false,
        center: true,
    },
];

const rowClicked = (row) => {
    console.log(row);
}

function LeaderboardTable(props) {
    console.log("In leaderboard table:")
    console.log(props.data)
    return (
        <LeaderboardDiv id="leaderboard-div">
            <TableDiv id="leaderboard-table">
                <DataTable
                    title="Leaderboard"
                    columns={columns}
                    data={props.data}
                    theme='bingo'
                    customStyles={customStyles}
                    noHeader='true'
                    noDataComponent={<p>No data available.</p>}
                    onRowClicked={rowClicked}
                    pointerOnHover={true}
                />
            </TableDiv>
        </LeaderboardDiv>
    );
}

export default LeaderboardTable;