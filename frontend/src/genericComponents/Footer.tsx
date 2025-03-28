import styled from "styled-components";
import React from "react";
import {Colors} from "../style/GlobalStyle.tsx";

export const Footer: React.FC = () => {
  return (
    <FooterDiv id="footer">
      <p>
        <a href="https://ootbingo.github.io/bingo" target="_blank" rel="noreferrer">
          OoT Bingo
        </a>
        {" | "}
        <a href="https://racetime.gg/oot/leaderboards" target="_blank" rel="noreferrer">
          racetime.gg leaderboard
        </a>
      </p>
    </FooterDiv>
  );
};

const FooterDiv = styled.div`
  width: 100%;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.3rem;
  p {
    color: grey;
  }
  a {
    transition: color 0.2s ease;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    color: grey;
    text-decoration: none;
  }
  a:hover {
    color: ${Colors.textColor};
  }
`;
