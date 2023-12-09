import React from "react";
import "./Popout.css";

interface Props {
  show: boolean;
  children: React.ReactNode;
  position?: { x: number, y: number}
}

const Popout = ({ show, children, position }: Props) => {
  const styles: React.CSSProperties = {
    opacity: show ? 1 : 0,
    pointerEvents: show ? "all" : "none",
  };

  if (position) {
    styles.translate = `${position.x}px, ${position.y}px`;
  }

  return (
    <div className="popout" style={styles}>
      {children}
    </div>
  );
};

export default Popout;
