import React from "react";
import styled from "styled-components";
import DataTable from 'react-data-table-component';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);


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

    componentDidMount() {
        this.timeAgo = new TimeAgo('en-US')
    }

    customStyles = {
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
            name: 'LB time',
            selector: 'leaderboardTime',
            width: '90px',
            sortable: true,
            center: true,
        },
        {
            name: 'Last seen',
            selector: 'lastRaced',
            width: '100px',
            sortable: true,
            format: (row, idx) => this.timeAgo.format(new Date(row.lastRaced)).replace(' ago', ''),
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


    render() {
        console.log("In leaderboard table:")
        console.log(this.props.data)
        return (
            <this.LeaderboardDiv id="leaderboard-div">
                <this.TableDiv id="leaderboard-table">
                    <DataTable
                        title="Leaderboard"
                        columns={this.columns}
                        data={this.props.data}
                        theme='bingo'
                        customStyles={this.customStyles}
                        noHeader='true'
                        noDataComponent={<p>No data available.</p>}
                        onRowClicked={this.props.onRowClick}
                        pointerOnHover={true}
                    />
                </this.TableDiv>
            </this.LeaderboardDiv>
        );
    }

}

export default LeaderboardBlock;