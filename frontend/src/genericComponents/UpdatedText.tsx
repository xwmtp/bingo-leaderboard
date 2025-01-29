import styled from "styled-components";
import React from "react";
import {DateTime} from "luxon";
import {WithTooltip} from "../pages/mainLeaderboard/components/player/Tooltip.tsx";

interface Props {
  dateTime?: string;
}

export const LastUpdated: React.FC<Props> = ({dateTime}) => {
  if (!dateTime) {
    return null;
  }

  return (
    <WithTooltip
      tooltipText={DateTime.fromISO(dateTime)
        .setLocale("en-US")
        .toLocaleString(DateTime.DATETIME_FULL)}
    >
      <LastUpdatedDiv id="last-updated-text">
        <span>
          Last update:{" "}
          {DateTime.fromISO(dateTime)
            .setLocale("en-US")
            .toRelative({style: "long", locale: "en-US"})}
        </span>
      </LastUpdatedDiv>
    </WithTooltip>
  );
};

const LastUpdatedDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: var(--text-color);
  opacity: 0.8;
`;
