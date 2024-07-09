import React, { useState } from "react";
import Popout from "./Popout";
import "./PopoutToggle.css";

interface Props {
  children: React.ReactNode;
  button: React.ReactNode;
}

const PopoutToggle = ({ children, button }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <span onClick={() => setShow(!show)}>
        {button}
      </span>
      <Popout show={show}>
        <a className="close-link" onClick={() => setShow(false)}>
          Close
        </a>
        {children}
      </Popout>
    </>
  );
};

export default PopoutToggle;
