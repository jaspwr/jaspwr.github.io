import React from "react";
import "./Demo.css";

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  close: () => void;
}

const Demo = ({ children, title, close }: Props) => {
  return (
    <>
      <div className="whole-screen darkener"></div>
      <div className="demo-window">
        <div className="demo-header">
          <div className="demo-header-title demo-title heading-text">
            {title}
          </div>
          <div className="demo-header-close">
            <img
              className="close-button"
              onClick={close}
              src="icons/cross.svg"
              alt="close"
            />
          </div>
        </div>
        <br />
        {children}
      </div>
    </>
  );
};

export default Demo;
