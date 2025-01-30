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
      <ContentLeft>
        <Link to="/bingo-leaderboard">
          <h1>OoT Bingo Leaderboard</h1>
        </Link>
        <LastUpdated dateTime={dateTime} />
      </ContentLeft>

      <Link to="/bingo-leaderboard/about">
        <h2>About</h2>
      </Link>
    </HeaderDiv>
  );
};

const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const HeaderDiv = styled.div`
  background-color: var(--row-color);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 40px;
  min-height: 84px;
  column-gap: 8px;

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
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
