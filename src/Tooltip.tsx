import React from "react";
import "./Tooltip.css";

interface Props {
  show: boolean;
  children: React.ReactNode;
}

const Tooltip = ({ show, children }: Props) => {
  const styles: React.CSSProperties = {
    opacity: show ? 1 : 0,
    pointerEvents: show ? "all" : "none",
  };

  return (
    <div className="tooltip-container" style={styles}>
      <div className="tooltip">
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
