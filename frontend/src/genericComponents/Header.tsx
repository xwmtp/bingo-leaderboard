import React from "react";
import styled from "styled-components";
import {LastUpdated} from "./UpdatedText.tsx";
import {NavLink} from "react-router-dom";

interface Props {
  dateTime?: string;
}

export const Header: React.FC<Props> = ({dateTime}) => {
  return (
    <HeaderDiv>
      <div>
        <Link to="/bingo-leaderboard-frontend">
          <h1>OoT Bingo Leaderboard</h1>
        </Link>
        <LastUpdated dateTime={dateTime} />
      </div>

      <Link to="/about">
        <h2>About</h2>
      </Link>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  background-color: var(--row-color);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 40px;
  min-height: 84px;
`;

const Link = styled(NavLink)`
  h1,
  h2 {
    transition: color 0.2s ease;
    &:hover {
      color: var(--yellow);
    }
  }
`;
