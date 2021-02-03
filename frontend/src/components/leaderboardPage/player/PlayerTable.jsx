import React from "react";
import styled from "styled-components";
import DataTable from 'react-data-table-component';
import { customStyles } from '../TableTheme.js'

const TableDiv = styled.div`
    font-size: 16px;
    margin-bottom: 20px;
`

const NoTableDiv = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    //margin-top: 100px;
    //border 1px solid green;
`




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
        width: '110px',
        center: true,
        format: (row, idx) => row.date.split('T')[0]
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

const onRowClicked = (row) => {
    window.open(`https://www.racetime.gg/${row.slug}`)
}

function PlayerTable(props) {
    console.log("In player table:")
    console.log(props.data)
    const noTable =
        <NoTableDiv>
            <p>Click on a leaderboard row to display player info.</p>
        </NoTableDiv>

    const table =
        <TableDiv >
            <DataTable
                title="Leaderboard"
                columns={columns}
                data={props.data.results}
                theme='bingo'
                customStyles={customStyles}
                conditionalRowStyles={conditionalRowStyles}
                onRowClicked={onRowClicked}
                noHeader='true'
                noDataComponent={noTable}
                pointerOnHover={true}
            />
        </TableDiv>

    const tableContent = props.data.name === "" ? noTable : table;
    return (
        tableContent
    );
}

export default PlayerTable;