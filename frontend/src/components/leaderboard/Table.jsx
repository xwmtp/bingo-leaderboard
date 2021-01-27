import React from "react";
import styled from "styled-components";
import DataTable, {createTheme} from 'react-data-table-component';


const TableDiv = styled.div`
    height: 50px;
    background: var(--violet);
    font-size: 100px;
`

const data = [
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
    },
    {
        id:3,
        playerName: "Exodus",
        racetimePoints: 3341,
        leaderboardScore: 869,
        leaderboardTime: "1:12:36",
        effectiveMedian: "1:12:27",
        average: "1:11:34",
        lastRaced: "Jan 23, 2021",
        finishedRacesCount: 13,
        includedRacesCount: 15
    },
    {
        id:4,
        playerName: "Amateseru",
        racetimePoints: 3399,
        leaderboardScore: 860,
        leaderboardTime: "1:13:06",
        effectiveMedian: "1:11:57",
        average: "1:12:28",
        lastRaced: "Nov 28, 2020",
        finishedRacesCount: 14,
        includedRacesCount: 15
    },
    {
        id:5,
        playerName: "tob3000",
        racetimePoints: 3507,
        leaderboardScore: 837,
        leaderboardTime: "1:14:27",
        effectiveMedian: "1:15:58",
        average: "1:16:24",
        lastRaced: "Jan 23, 2021",
        finishedRacesCount: 15,
        includedRacesCount: 15
    }
]

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
        default:'#f7e279',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });

  const customStyles = {
      header : {
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
          }
          
      }
  }


const columns = [
    {
        name: 'Rank',
        selector: 'id',
        sortable: true,
        width: '60px',
        center: true,

    },
    {
        name: 'Name',
        selector: 'playerName',
        sortable: true,
        minWidth: '150px',
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
];


function Table() {

    
    return (
        <TableDiv >
            <DataTable
                title="Leaderboard"
                columns={columns}
                data={data}
                theme='bingo'
                customStyles={customStyles}
                noHeader='true'

            />
        </TableDiv>
    );
}

export default Table;