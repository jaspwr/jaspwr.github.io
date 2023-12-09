import React, { useState } from "react";
import Popout from "./Popout";

interface Props {
  children: React.ReactNode;
}

const PopoutToggle = ({ children }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <Popout show={show}>{children}</Popout>
    </>
  );
};

export default PopoutToggle;
