import React from "react";

export function Tooltip(props) {
  return (
    <div className="tooltip">
      {props.title}
      <span className="tooltiptext">
        <p className="tooltiptextheader">{props.textheader}</p>

        <p>{props.text}</p>
      </span>
    </div>
  );
}
