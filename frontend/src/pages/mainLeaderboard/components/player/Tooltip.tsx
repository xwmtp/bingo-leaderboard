import React from "react";
import styled from "styled-components";
import {Colors} from "../../../../style/GlobalStyle.tsx";

interface WrapperProps {
  children: React.ReactNode;
  tooltipText: string;
  tooltipHeading?: string;
}

export const WithTooltip: React.FC<WrapperProps> = ({children, tooltipText, tooltipHeading}) => {
  return (
    <WithTooltipContainer>
      {children}
      <Tooltip>
        {!!tooltipHeading && <TooltipHeading>{tooltipHeading}</TooltipHeading>}
        <p>{tooltipText}</p>
      </Tooltip>
    </WithTooltipContainer>
  );
};

const WithTooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  user-select: none;

  &:hover > span {
    visibility: visible;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: 13rem;
  background-color: ${Colors.yellow};
  color: black;
  font-weight: normal;
  font-size: 0.9rem;
  text-align: center;
  border-radius: 0.4rem;
  padding: 0.3rem;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: -6.7rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -0.3rem;
    border-width: 0.3rem;
    border-style: solid;
    border-color: transparent transparent ${Colors.yellow} transparent;
  }
`;

const TooltipHeading = styled.p`
  font-weight: bold;
`;
