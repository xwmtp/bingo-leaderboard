import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom"

const HeaderDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0px 30px 0px;
    .current {
        color: white;
    }
`

const Navigation = styled.div`
    display: flex;
    flex-direction: row;
`

const Link = styled(NavLink)`
    font-size: 25px;
    margin: 10px 20px;
    color: var(--light-gray);
    text-decoration: none;
`;

function Header() {

    return (
        <HeaderDiv id='header' >
            <h1>
                Ocarina of Time Bingo
            </h1>
            <Navigation>
                <Link to="/" activeClassName='current' exact>Leaderboard</Link>
                <Link to="/about" activeClassName='current' exact>About</Link>
            </Navigation>
        </HeaderDiv>
    );
}

export default Header;
