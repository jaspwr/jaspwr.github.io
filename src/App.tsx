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
import LilacDemo from "./LilacDemo";
import DawInfo from "./DawInfo";

let scrollTarget = 0;
let scroll_ = 0;
let hasScrolled = false;

const up = () => {
  scrollTarget -= 0.5;
  scrollTarget = Math.max(0, scrollTarget);
  scrollTarget = Math.min(1, scrollTarget);
}

const down = () => {
  scrollTarget += 0.5;
  scrollTarget = Math.max(0, scrollTarget);
  scrollTarget = Math.min(1, scrollTarget);
}

const setToClosest = () => {
  if (scroll_ < 0.25) {
    scrollTarget = 0;
  } else if (scroll_ < 0.75) {
    scrollTarget = 0.5;
  } else {
    scrollTarget = 1;
  }
}

const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};

function App() {
  const [scroll, setScroll] = useState(0);
  const [holdingScrollBar, setHoldingScrollBar] = useState(false);
  const [showingDemo, setShowingDemo] = useState("none");

  useEffect(() => {
    if (showingDemo !== "none") return () => { };

    // TODO: rewrite this whole thing
    
    let last_scroll = Date.now();

    const handleWheel = (e: WheelEvent) => {
      if (holdingScrollBar) return;
      if (Math.abs(scroll_ - scrollTarget) > 0.15) return;
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      if (last_scroll + 1000 > Date.now()) return;

      if (e.deltaY < 0) {
        up();
      } else {
        down();
      }

      last_scroll = Date.now();
    };

    const touchStart = { x: 0, y: 0 };
    let handledTouch = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      touchStart.x = e.touches[0].clientX;
      touchStart.y = e.touches[0].clientY;
      handledTouch = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (!handledTouch) return;

      const diffY = e.touches[0].clientY - touchStart.y;
      const diffX = e.touches[0].clientX - touchStart.x;

      if (Math.abs(diffY) < Math.abs(diffX)) return;

      if (diffY > 0) {
        up();
      } else {
        down();
      }

      handledTouch = false;
    };

    const interval = window.setInterval(() => {
      if (holdingScrollBar) {
        hasScrolled = true;
        return;
      }

      if (!hasScrolled) {
        if (scroll_ === scrollTarget) return;
      }

      requestAnimationFrame(() => {

        setScroll((prev) => {
          scroll_ = prev;

          scroll_ = lerp(scroll_, scrollTarget, 0.1);

          if (Math.abs(scroll_ - scrollTarget) < 0.001) {
            scroll_ = scrollTarget;
          }

          if (hasScrolled) {
            hasScrolled = false;
            setToClosest();
          }

          return scroll_;
        });
      });
    }, 1000 / 30);

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.clearInterval(interval);
    };
  }, [showingDemo, holdingScrollBar]);

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
          )) ||
          (showingDemo === "lilac" && (
            <Demo
              title="Lilac live WASM demo"
              close={() => {
                setShowingDemo("none");
              }}
            >
              <LilacDemo />
            </Demo>
          )) || (showingDemo === "daw" && (
            <Demo
              title="DAW Info"
              close={() => {
                setShowingDemo("none");
              }}
            >
              <DawInfo />
            </Demo>
          ))
        )}
      <FakeScrollBar scroll={scroll} setHoldingScrollBar={setHoldingScrollBar} setScroll={setScroll} />
      <DarkModeToggle />
      <ScrollIndicator />
      <Blurb scroll={scroll} />
      <Projects scroll={scroll} setDemo={setShowingDemo} />
      <Contact scroll={scroll} />
    </>
  );
}

export default App;
