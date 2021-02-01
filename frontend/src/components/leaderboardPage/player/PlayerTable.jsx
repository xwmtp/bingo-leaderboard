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

const customSort = (rows, field, direction) => {
    console.log("sorting");
    console.log(rows);
    console.log(field);
    console.log(direction);
    const handleField = row => row[field];
    console.log(handleField(rows[0]))
    const newRows = rows.slice(0);
    if (field === 'm') {
        return 'm'
    } else {
        return newRows.sort((a, b) => {
            //const val1 = typeof val1 === 'string'? a[field].toLowerCase : 
            if (a[field] < b[field]) {
                return direction === "asc"? -1 : 1
            }
            if (a[field] > b[field]) {
                return direction === "asc"? 1 : -1
            }
            return 0})
    }
}

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
                onRowClicked={onRowClicked}
                sortFunction={customSort}
                noHeader='true'
                noDataComponent={<p>Click on a leaderboard row to display player info.</p>}
                pointerOnHover={true}
            />
        </TableDiv>

    );
}

export default PlayerTable;