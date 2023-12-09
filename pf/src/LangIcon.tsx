import React from "react";
import Popout from "./Popout";
import "./LangIcon.css";

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
      <Popout show={showTooltip}>
        <div className="tooltip">{name}</div>
      </Popout>
    </>
  );
};

export default LangIcon;
