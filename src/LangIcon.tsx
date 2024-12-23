import React, { memo } from "react";
import "./LangIcon.css";
import Tooltip from "./Tooltip";

interface Props {
  name: string;
  imgSrc: string;
  hasToolTip?: boolean;
}

const LangIcon = memo(({ name, imgSrc, hasToolTip }: Props) => {
  let [showTooltip, setShowTooltip] = React.useState(false);

  if (hasToolTip === undefined) {
    hasToolTip = true;
  }

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
      {hasToolTip ?
        <Tooltip show={showTooltip}>
          {name}
        </Tooltip>
        : null
      }
    </>
  );
});

export default LangIcon;
