import styled from "styled-components";
import React from "react";
import Moment from "moment";

interface Props {
  timestamp?: string;
}

export const LastUpdated: React.FC<Props> = ({ timestamp }) => {
  return (
    <LastUpdatedDiv id="last-updated-text">
      <p>
        {timestamp
          ? `Data last updated at ${Moment(timestamp).format("h:mm a (utcZ), D MMM  YYYY ")}`
          : ""}
      </p>
    </LastUpdatedDiv>
  );
};

const LastUpdatedDiv = styled.div`
  min-height: 16px;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
  color: gray;
  align-self: flex-start;
`;
