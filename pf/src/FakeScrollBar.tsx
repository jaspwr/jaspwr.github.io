import React, { useEffect, useState } from "react";
import "./FakeScrollBar.css";

interface Props {
  scroll: number;
  setScroll: React.Dispatch<React.SetStateAction<number>>;
  setHoldingScrollBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const FakeScrollBar = ({ scroll, setScroll, setHoldingScrollBar }: Props) => {
  const [scrolling, setScrolling] = useState(false);

  const innerBarStyle: React.CSSProperties = {
    transform: `translateY(${scroll * 231}%)`,
  };

  const handleMouseDown = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setScrolling(true);
    setHoldingScrollBar(true);
    document.documentElement.style.setProperty("user-select", "none");
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (scrolling) {
      setScroll((prev: number) => {
        const newScroll = prev + e.movementY / 231;
        return Math.min(Math.max(newScroll, 0), 1);
      });
    }
  };

  const handleMouseUp = (_: MouseEvent) => {
    setScrolling(false);
    setHoldingScrollBar(false);
    document.documentElement.style.setProperty("user-select", "auto");
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [scrolling]);

  return (
    <div className="scroll-bar-container" onMouseDown={handleMouseDown}>
      <div className="scroll-bar" style={innerBarStyle}></div>
      {scrolling}
    </div>
  );
};

export default FakeScrollBar;
