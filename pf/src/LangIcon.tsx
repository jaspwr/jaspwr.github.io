import React from "react";
import "./LangIcon.css";
import Tooltip from "./Tooltip";

interface Props {
  name: string;
  imgSrc: string;
}

const LangIcon = ({ name, imgSrc }: Props) => {
  let [showTooltip, setShowTooltip] = React.useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img className="lang-icon" src={imgSrc} alt={name} />
      </span>
      <Tooltip show={showTooltip}>
        <div className="tooltip">{name}</div>
      </Tooltip>
    </>
  );
};

export default LangIcon;
