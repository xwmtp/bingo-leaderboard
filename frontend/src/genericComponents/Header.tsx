import React from "react";
import styled from "styled-components";
import {LastUpdated} from "./LastUpdated.tsx";
import {NavLink} from "react-router-dom";
import {Colors} from "../style/GlobalStyle.tsx";

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
  row-gap: 0.3rem;
  align-items: flex-start;
`;

const HeaderDiv = styled.div`
  background-color: ${Colors.rowColor};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 2.7rem;
  min-height: 5.6rem;
  column-gap: 0.5rem;
`;

const Link = styled(NavLink)`
  h1,
  h2 {
    transition: color 0.2s ease;
    &:hover {
      color: ${Colors.yellow};
    }
  }
`;
