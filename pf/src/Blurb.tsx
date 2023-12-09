import React from "react";
import LangIcon from "./LangIcon";
import "./Blurb.css";
import AsmScroll from "./AsmScroll";

const Blurb = () => {
  const grid1Style = {
    transform: "translate(-23.7rem, -5.1rem)"
  };

  const grid2Style = {
    transform: "translate(7.6rem, -12rem)"
  };

  return (
    <>
      <img className="grid bg-element" style={grid1Style} src="/decor/grid_s.svg"/>
      <img className="grid bg-element" style={grid2Style} src="/decor/grid_l.svg"/>
      <AsmScroll />
      <div className="blurb-main shadowed-container">
        <span className="my-name heading-text">Jasper Parker</span>
        <p className="blurb-subtext">
          Hi, I'm a developer with experience in a vast array of lorem ipsum
          dolor cosecutor ect. ect.
        </p>
        <div className="skills-icons">
          <LangIcon imgSrc="/icons/rust.svg" name="Rust" />
          <LangIcon imgSrc="/icons/react.svg" name="React" />
          <LangIcon imgSrc="/icons/cpp.svg" name="C++" />
          <LangIcon imgSrc="/icons/js.svg" name="Javascript" />
          <LangIcon imgSrc="/icons/ts.svg" name="Typescript" />
          <LangIcon imgSrc="/icons/c.svg" name="C" />
          <LangIcon imgSrc="/icons/py.svg" name="Python" />
          <LangIcon imgSrc="/icons/sql.svg" name="SQL" />
          <LangIcon imgSrc="/icons/java.svg" name="Java" />
          <LangIcon imgSrc="/icons/jl.svg" name="Julia" />
          <LangIcon imgSrc="/icons/haskell.svg" name="Haskell" />
          <LangIcon imgSrc="/icons/cs.svg" name="C#" />
          <LangIcon imgSrc="/icons/tf.svg" name="Tensorflow" />
          <LangIcon imgSrc="/icons/svelte.svg" name="Svelte" />
          <LangIcon imgSrc="/icons/git.svg" name="Git" />
          <LangIcon imgSrc="/icons/linux.svg" name="GNU/Linux" />
          <LangIcon imgSrc="/icons/gl.svg" name="OpenGL" />
          <LangIcon imgSrc="/icons/llvm.svg" name="LLVM" />
        </div>
      </div>
    </>
  );
};

export default Blurb;
