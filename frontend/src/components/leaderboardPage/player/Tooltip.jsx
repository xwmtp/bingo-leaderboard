import React from "react";

function Tooltip(props) {
    return (
        <div class="tooltip">{props.title}
            <span class="tooltiptext">
                <p class="tooltiptextheader">
                    {props.textheader}
                </p>
                <p>
                    {props.text}
                </p>

            </span>
        </div>
    );
}

export default Tooltip;