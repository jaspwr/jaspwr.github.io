import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ChessBoard from "./ChessBoard";
import DarkModeToggle from "./DarkModeToggle";
import Blurb from "./Blurb";

function App() {
  return (
    <>
      <DarkModeToggle />
      <Blurb />
    </>
  );
}

export default App;
