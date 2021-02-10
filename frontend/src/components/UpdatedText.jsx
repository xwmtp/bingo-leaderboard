import styled from "styled-components";
import React from "react";
import Moment from "moment"

const LastUpdated = styled.div`
    height: 20px;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 12px;
    color: gray;
    align-self: flex-start;
`

function UpdatedText(props) {

    let text = ""
    if (props.timestamp !== undefined) {
        text = `Data last updated at ${Moment(props.timestamp).format("LT, MMM Do YYYY ")}`
    }

    return (
        <LastUpdated id='last-updated-text' >
            <p>{text}</p>
        </LastUpdated>
    );
}

export default UpdatedText;
