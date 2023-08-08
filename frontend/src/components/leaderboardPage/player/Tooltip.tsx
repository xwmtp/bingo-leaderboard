import React from "react";

interface Props {
  title: string;
  text: string;
  textHeader: string;
}

export const Tooltip: React.FC<Props> = ({ title, text, textHeader }) => {
  return (
    <div className="tooltip">
      {title}
      <span className="tooltiptext">
        <p className="tooltiptextheader">{textHeader}</p>
        <p>{text}</p>
      </span>
    </div>
  );
};
