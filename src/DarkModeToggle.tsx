import { useState } from "react";
import "./DarkModeToggle.css";

enum Mode {
  Light,
  Dark,
}

const DarkModeToggle = () => {
  let defaultMode: Mode = Mode.Dark;

  // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //   defaultMode = Mode.Dark;
  // }

  let [mode, setMode] = useState(defaultMode as Mode);

  const style = document.documentElement.style;

  if (mode === Mode.Light) {
    style.setProperty("--primary-text", "#000");
    style.setProperty("--secondary-text", "#fff");
    style.setProperty("--primary-background", "#fff");
    style.setProperty("--secondary-background", "#5f5f5f");
    style.setProperty("--icon-filter", "invert(0)");
    style.setProperty("--shadow-colour", "rgba(0, 0, 0, 0.24)");
  } else if (mode === Mode.Dark) {
    style.setProperty("--primary-text", "#fff");
    style.setProperty("--secondary-text", "#1f1e29");
    style.setProperty("--primary-background", "#1f1e29");
    style.setProperty("--secondary-background", "#AAA");
    style.setProperty("--icon-filter", "invert(1)");
    style.setProperty("--shadow-colour", "rgba(0, 0, 0, 0.65)");
  }

  const toggle = () => {
    if (mode === Mode.Light) {
      setMode(Mode.Dark);
    } else {
      setMode(Mode.Light);
    }
  };

  return (
    <div className="darkmode-toggle" onClick={toggle}>
      <img src={mode === Mode.Light ? "icons/moon.svg" : "icons/sun.svg"} alt="Dark mode toggle" />
    </div>
  );
};

export default DarkModeToggle;
