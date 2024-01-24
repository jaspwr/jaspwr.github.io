import LangIcon from "./LangIcon";
import "./Blurb.css";
import AsmScroll from "./AsmScroll";
import { depthStyle } from "./depthStyles";

import { useWindowSize } from "@uidotdev/usehooks";

interface Props {
  scroll: number;
}

const Blurb = ({ scroll }: Props) => {
  const size = useWindowSize();

  const blurbMainStyles: React.CSSProperties = {};

  if (size.width !== null && size.width < 1000) {
    const width = size.width / 2.5;
    blurbMainStyles.width = `${width}px`;
    blurbMainStyles.left = `calc(50% - ${width / 2}px)`;
    blurbMainStyles.top = "10rem";
    blurbMainStyles.transform = "translate(0, 0)";
    blurbMainStyles.height = "fit-content";
  }

  const grid1Style = {
    transform: "translate(-27.7rem, -2rem)",
  };

  const grid2Style = {
    transform: "translate(9.3rem, -14.5rem)",
  };

  const star1Style = {
    transform: "translate(-25rem, -12rem)",
  };

  const star2Style = {
    transform: "translate(25rem, 6rem)",
  };

  const starAnimationDelay = {
    animationDelay: "0.5s",
  };

  return (
    <>
      <div className="whole-screen" style={depthStyle(scroll, 1.4, 0)}>
        <div style={star1Style} className="bg-element">
          <img className="star" src="/decor/star.svg" />
        </div>
        <div style={star2Style} className="bg-element">
          <img
            className="star"
            style={starAnimationDelay}
            src="/decor/star.svg"
          />
        </div>
      </div>
      <div className="whole-screen" style={depthStyle(scroll, 1.3, 0)}>
        <img
          className="grid bg-element"
          style={grid1Style}
          src="/decor/grid_s.svg"
        />
        <img
          className="grid bg-element"
          style={grid2Style}
          src="/decor/grid_l.svg"
        />
        <AsmScroll />
      </div>
      <div className="whole-screen" style={depthStyle(scroll, 1.5, 0)}>
        <div style={blurbMainStyles} className="blurb-main shadowed-container">
          <span className="my-name heading-text">
            Jasper Parker - Full Stack Developer
          </span>
          <p className="blurb-subtext">
            Welcome to my digital space! I'm Jasper Parker, a dynamic full-stack
            developer with a passion for crafting innovative solutions. Armed
            with expertise in Rust, C/C++, JS/TS, Haskell, and C#, I thrive in
            the diverse realm of programming.
          </p>
          <br />
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
      </div>
    </>
  );
};

export default Blurb;
