import React from "react";
import styled from "styled-components";
import DataTable from 'react-data-table-component';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

const LeaderboardDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    max-width: 700px;
    margin-right: 20px;
    //border: solid grey 1px;
`

const TableDiv = styled.div`
    height: 100%;
    font-size: 16px;
`


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

const timeAgo = new TimeAgo('en-US')
const columns = [
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
        name: 'LB time',
        selector: 'leaderboardTime',
        width: '90px',
        sortable: true,
        center: true,
    },
    {
        name: 'Last race',
        selector: 'lastRaced',
        width: '100px',
        sortable: true,
        format: (row, idx) => timeAgo.format(new Date(row.lastRaced)).replace(' ago', ''),
        hide: 1000,
        right: true
    },
    {
        name: 'Finished',
        selector: 'finishedRacesFraction',
        sortable: false,
        center: true,
    },
];


function LeaderboardBlock(props) {
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
                    onRowClicked={props.onRowClick}
                    pointerOnHover={true}
                />
            </TableDiv>
        </LeaderboardDiv>
    );
}

export default LeaderboardBlock;