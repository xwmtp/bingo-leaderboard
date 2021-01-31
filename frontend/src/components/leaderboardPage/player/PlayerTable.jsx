import React from "react";
import styled from "styled-components";
import DataTable from 'react-data-table-component';


const TableDiv = styled.div`
    height: 100%;
    font-size: 16px;
    //border: 1px solid yellow;
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
        width: '100px',
        sortable: true,
        center: true,

    },
    {
        name: 'Aged',
        selector: 'agedTime',
        width: '100px',
        sortable: true,
        center: true,
    },
    {
        name: 'Date',
        selector: 'date',
        sortable: true,
        width: '130px',
        right: true,

    },
    {
        name: 'Comment',
        selector: 'comment',
        sortable: false,
        maxWidth: '180px',
        left: true,

    },
];

const conditionalRowStyles = [
    {
        when: row => row.dropped,
        style: {
            color: 'grey'
        }
    }
]

function PlayerTable(props) {
    console.log("In player table:")
    console.log(props.data)
    return (
        <TableDiv >
            <DataTable
                title="Leaderboard"
                columns={columns}
                data={props.data.results}
                theme='bingo'
                customStyles={customStyles}
                conditionalRowStyles={conditionalRowStyles}
                noHeader='true'
                noDataComponent={<p>Click on a leaderboard row to display player info.</p>}
                pointerOnHover={true}
            />
        </TableDiv>

    );
}

export default PlayerTable;