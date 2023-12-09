import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ChessBoard from "./ChessBoard";
import DarkModeToggle from "./DarkModeToggle";
import Blurb from "./Blurb";
import FakeScrollBar from "./FakeScrollBar";

function App() {
  const [scroll, setScroll] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setScroll((prev) => {
        const newScroll = prev + e.deltaY / 5000;
        return Math.min(Math.max(newScroll, 0), 1);
      });
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      <FakeScrollBar scroll={scroll} setScroll={setScroll} />
      <DarkModeToggle />
      <Blurb scroll={scroll} />
    </>
  );
}

export default App;
