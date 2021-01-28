import styled from "styled-components";
import React from "react";

const HeaderDiv = styled.div`
    height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 30px;
`

function Header() {

    return (
        <HeaderDiv id='header' >
            <h1>
                Ocarina of Time Bingo
            </h1>
        </HeaderDiv>
    );
}

export default Header;
