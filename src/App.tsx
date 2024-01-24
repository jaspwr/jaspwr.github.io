import { useEffect, useState } from "react";
import "./App.css";

import ChessBoard from "./ChessBoard";
import DarkModeToggle from "./DarkModeToggle";
import Blurb from "./Blurb";
import FakeScrollBar from "./FakeScrollBar";
import Projects from "./Projects";
import Demo from "./Demo";
import Contact from "./Contact";
import LiADemo from "./LiADemo";
import ScrollIndicator from "./ScrollIndicator";

const scrollVelocity: { v: number } = { v: 0 };

const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};

function App() {
  const [scroll, setScroll] = useState(0);
  const [holdingScrollBar, setHoldingScrollBar] = useState(false);
  const [showingDemo, setShowingDemo] = useState("none");

  useEffect(() => {
    if (showingDemo !== "none") return () => {};

    // TODO: rewrite this whole thing

    const handleWheel = (e: WheelEvent) => {
      console.log(e.deltaY);
      scrollVelocity.v = Math.sign(e.deltaY) * 0.035;
      console.log(scrollVelocity);
    };

    const interval = window.setInterval(() => {
      if (Math.abs(scrollVelocity.v) < 0.005) {
        scrollVelocity.v = 0;
      }

      if (scrollVelocity.v === 0) return;

      scrollVelocity.v = lerp(scrollVelocity.v, 0, 0.1);

      setScroll((prev) => {
        const newScroll = prev + scrollVelocity.v;
        if (newScroll < 0 || newScroll > 1) {
          scrollVelocity.v = 0;
        }
        return Math.min(Math.max(newScroll, 0), 1);
      });
    }, 1000 / 30);

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.clearInterval(interval);
    };
  }, [showingDemo]);

  useEffect(() => {
    if (showingDemo !== "none") return () => {};
    if (holdingScrollBar) return () => {};

    const interval = window.setInterval(() => {
      if (scroll !== 0 && scroll !== 0.5 && scroll !== 1) {
        setScroll((prev) => {
          if (prev < 0.25) {
            return lerp(prev, 0, 0.17);
          } else if (prev < 0.75) {
            if (scrollVelocity.v === 0 && Math.abs(prev - 0.5) < 0.005) {
              return 0.5;
            }
            return lerp(prev, 0.5, 0.17);
          } else {
            return lerp(prev, 1, 0.17);
          }
        });
      }
    }, 1000 / 30);

    return () => {
      window.clearInterval(interval);
    };
  }, [scroll, showingDemo, holdingScrollBar]);

  return (
    <>
      {showingDemo !== "none" &&
        ((showingDemo === "chess" && (
          <Demo
            title="Chess engine live WASM demo"
            close={() => {
              setShowingDemo("none");
            }}
          >
            <ChessBoard />
          </Demo>
        )) ||
          (showingDemo === "lia" && (
            <Demo
              title="LiA live WASM demo"
              close={() => {
                setShowingDemo("none");
              }}
            >
              <LiADemo />
            </Demo>
          )))}
      <FakeScrollBar scroll={scroll} setHoldingScrollBar={setHoldingScrollBar} setScroll={setScroll} />
      <DarkModeToggle />
      <ScrollIndicator scroll={scroll} />
      <Blurb scroll={scroll} />
      <Projects scroll={scroll} setDemo={setShowingDemo} />
      <Contact scroll={scroll} />
    </>
  );
}

export default App;
