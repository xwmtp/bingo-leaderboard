import React from "react";
import styled from "styled-components";
import DataTable from 'react-data-table-component';

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