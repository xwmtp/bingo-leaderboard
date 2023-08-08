import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";

export function Header() {
  const linkStyle = ({ isActive }) => ({ color: isActive ? "white" : "lightGrey" });

  return (
    <HeaderDiv id="header">
      <h1>Ocarina of Time Bingo</h1>
      <Navigation>
        <Link to="/" style={linkStyle}>
          Leaderboard
        </Link>
        <Link to="/about" style={linkStyle}>
          About
        </Link>
      </Navigation>
    </HeaderDiv>
  );
}

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0 30px 0;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
`;

const Link = styled(NavLink)`
  font-size: 25px;
  margin: 10px 20px;
  color: var(--light-gray);
  text-decoration: none;
`;
