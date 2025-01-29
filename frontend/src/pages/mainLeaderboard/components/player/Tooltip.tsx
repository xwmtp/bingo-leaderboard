import React from "react";
import styled from "styled-components";

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
  width: 200px;
  background-color: var(--yellow);
  color: black;
  font-weight: normal;
  font-size: 13px;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: -100px;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent var(--yellow) transparent;
  }
`;

const TooltipHeading = styled.p`
  font-weight: bold;
`;
