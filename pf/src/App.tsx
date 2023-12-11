import { useEffect, useState } from "react";
import "./App.css";

import ChessBoard from "./ChessBoard";
import DarkModeToggle from "./DarkModeToggle";
import Blurb from "./Blurb";
import FakeScrollBar from "./FakeScrollBar";
import Projects from "./Projects";
import Demo from "./Demo";
import Contact from "./Contact";

function App() {
  const [scroll, setScroll] = useState(0);
  // const [scrollVelocity, setScrollVelocity] = useState(0);
  const [showingDemo, setShowingDemo] = useState("none");

  useEffect(() => {

    const handleWheel = (e: WheelEvent) => {
      if (showingDemo !== "none") return;

      setScroll((prev) => {
        const newScroll = prev + e.deltaY / 5000;
        return Math.min(Math.max(newScroll, 0), 1);
      });
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [showingDemo]);

  return (
    <>
      {showingDemo !== "none" && (
        <Demo title="Chess engine live WASM demo" close={() => {setShowingDemo("none")}}>
          <ChessBoard />
        </Demo>
      )}
      <FakeScrollBar scroll={scroll} setScroll={setScroll} />
      <DarkModeToggle />
      <Blurb scroll={scroll} />
      <Projects scroll={scroll} setDemo={setShowingDemo}/>
      <Contact scroll={scroll} />
    </>
  );
}

export default App;
