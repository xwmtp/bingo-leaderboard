import styled from "styled-components";
import React from "react";

const HeaderDiv = styled.div`
    height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 30px;
`

const Navigation = styled.div`
    display: flex;
    flex-direction: row;
`

const Link = styled.div`
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
                <Link to="/" activeClassName='current' exact>About</Link>
            </Navigation>
        </HeaderDiv>
    );
}

export default Header;
