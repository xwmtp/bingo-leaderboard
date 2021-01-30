import React from "react";
import styled from "styled-components";
import DataTable from 'react-data-table-component';

const PlayerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 45%;
    border: solid red 1px;
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
        name: 'Time',
        selector: 'time',
        sortable: true,
        center: true,

    },
    {
        name: 'Aged',
        selector: 'agedTime',
        sortable: true,
        center: true,
    },
    {
        name: 'Date',
        selector: 'date',
        sortable: true,
        minWidth: '130px',
        right: true,

    },
];


const rowClicked = (row) => {
    console.log(row);
}

function PlayerTable(props) {
    console.log("In player table:")
    console.log(props.data)
    return (
        <PlayerDiv>
            <TableDiv >
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
        </PlayerDiv>
    );
}

export default PlayerTable;