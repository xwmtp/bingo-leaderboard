import styled from "styled-components";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <FooterDiv id="footer">
      <p>
        <a href="https://ootbingo.github.io/bingo" target="_blank" rel="noreferrer">
          OoT Bingo
        </a>
        {" | "}
        <a href="https://xwmtp.github.io/bingostats" target="_blank" rel="noreferrer">
          BingoStats
        </a>
      </p>
    </FooterDiv>
  );
};

const FooterDiv = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  p {
    color: grey;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    color: grey;
    text-decoration: none;
  }
  a:hover {
    color: #a7a7a7;
  }
`;
