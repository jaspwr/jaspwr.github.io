import LangIcon from "./LangIcon";
import "./Blurb.css";
// import AsmScroll from "./AsmScroll";
import { depthStyle } from "./depthStyles";

import { useWindowSize } from "@uidotdev/usehooks";

interface Props {
  scroll: number;
}

const Blurb = ({ scroll }: Props) => {
  const size = useWindowSize();

  const blurbMainStyles: React.CSSProperties = {};
  const titleStyles: React.CSSProperties = {};

  if (size.width !== null && size.width < 1000) {
    const width = size.width / 2.5;
    blurbMainStyles.width = `${width}px`;
    blurbMainStyles.left = `calc(50% - ${width / 2}px)`;
    blurbMainStyles.top = "calc(50% - 15rem)";
    blurbMainStyles.transform = "translate(0, 0)";
    blurbMainStyles.height = "fit-content";
    titleStyles.fontSize = "1.5rem";
    titleStyles.lineHeight = "1.9rem";
  }

  // const grid1Style = {
  //   transform: "translate(-27.7rem, -2rem)",
  // };
  //
  // const grid2Style = {
  //   transform: "translate(9.3rem, -14.5rem)",
  // };
  //
  // const star1Style = {
  //   transform: "translate(-25rem, -12rem)",
  // };
  //
  // const star2Style = {
  //   transform: "translate(25rem, 6rem)",
  // };
  //
  // const starAnimationDelay = {
  //   animationDelay: "0.5s",
  // };

  return (
    <>
      <div className="whole-screen" style={depthStyle(scroll, 1.5, 0)}>
        <div style={blurbMainStyles} className="blurb-main">
          <span className="my-name heading-text" style={titleStyles}>
            Jasper Parker - Full Stack Developer
          </span>
          <p className="blurb-subtext">
            A proficient and self-motivated programmer with a passion for
            creating and learning with several years of full-stack experience in
            freelance work and open source development.
          </p>
          <span className="skills-title">Technologies I'm familiar with include:</span>
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
