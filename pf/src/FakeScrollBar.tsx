import React, { useEffect } from 'react'
import './FakeScrollBar.css'

interface Props {
  scroll: number;
  setScroll: (scroll: number) => void;
}

const FakeScrollBar = ({scroll, setScroll}: Props) => {

  const innerBarStyle: React.CSSProperties = {
    transform: `translateY(${scroll * 231}%)`
  };

  return (
    <div className="scroll-bar-container">
      <div className="scroll-bar" style={innerBarStyle}></div>
    </div>
  )
}

export default FakeScrollBar