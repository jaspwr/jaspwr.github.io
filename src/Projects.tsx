import React from "react";
import { depthStyle } from "./depthStyles";
import ProjectsTitle from "./ProjectsTitle";
import ProjectPreview from "./ProjectPreview";
import "./Projects.css";
import LangIcon from "./LangIcon";

interface Props {
  scroll: number;
  setDemo: React.Dispatch<React.SetStateAction<string>>;
}

const Projects = ({ scroll, setDemo }: Props) => {
  // const grid1Style = {
  //   transform: "translate(-36.7rem, -2rem)",
  // };
  //
  // const grid2Style = {
  //   transform: "translate(14.3rem, -19rem)",
  // };

  const starStyle = {
    transform: "translate(-3rem, -21rem)",
  };

  // <img
  //   className="grid bg-element"
  //   style={grid1Style}
  //   src="/decor/grid_l.svg"
  // />
  // <img
  //   className="grid bg-element"
  //   style={grid2Style}
  //   src="/decor/grid_s.svg"
  // />

  return (
    <div style={{ pointerEvents: scroll < 0.1 ? "none" : "all" }}>
      <div className="whole-screen" style={depthStyle(scroll, 1.6, 0.5)}>
        <ProjectsTitle scroll={scroll} />
        <div style={starStyle} className="bg-element">
          <img className="star" src="/decor/star.svg" />
        </div>
      </div>
      <div className="whole-screen" style={depthStyle(scroll, 1.7, 0.5)}>
        <div className="project-previews-container">
          <div className="projects-previews-inner">
            <ProjectPreview
              title="Glimpse"
              image="previews/glimpse.png"
              githubLink="https://github.com/jaspwr/glimpse"
              description="A simple GTK3 launcher/file search engine for GNU/Linux. Instantly searches files and installed applications."
              lang={<LangIcon hasToolTip={false} name="Rust" imgSrc="icons/rust.svg" />}
            />
            <ProjectPreview
              title="Chess Engine"
              image="previews/chess.png"
              githubLink="https://github.com/jaspwr/chess"
              description="A UCI compatible chess engine written in C that uses magic bitboards and a custom evaluation function."
              clickAction={() => {
                setDemo("chess");
              }}
              lang={<LangIcon hasToolTip={false} name="C" imgSrc="icons/c.svg" />}
            />
            <ProjectPreview
              title={
                <span id="gpu-compiler-title">
                  GPU Based C <br />
                  Compiler
                </span>
              }
              image="previews/gpu.png"
              githubLink="https://github.com/jaspwr/gpucc"
              description="A prototype C compiler written in GLSL compute shaders that compiles a subset of C to x86_64 assembly."
              lang={
                <span className="double-lang-icons">
                  <span className="opengl-icon">
                    <LangIcon hasToolTip={false} name="OpenGL" imgSrc="icons/gl.svg" />
                  </span>
                  <LangIcon hasToolTip={false} name="C++" imgSrc="icons/cpp.svg" />
                </span>
              }
            />
            <ProjectPreview
              title={<span id="bd-title">BetterDiscord plugins</span>}
              image="https://raw.githubusercontent.com/jaspwr/BDPlugins/main/BetterAudioPlayer/img/dark.gif"
              githubLink="https://github.com/jaspwr/BDPlugins"
              description="Some plugins I've made for the BetterDiscord client."
              lang={
                <span className="double-lang-icons">
                  <LangIcon hasToolTip={false} imgSrc="/icons/js.svg" name="Javascript" />
                  <LangIcon hasToolTip={false} imgSrc="/icons/react.svg" name="React" />
                </span>
              }
            />
            <ProjectPreview
              title="DAW"
              image="previews/daw.png"
              githubLink="https://github.com/jaspwr/daw"
              description="
              A work in progress digital audio workstation with Vim inspired keyboard shortcuts."
              buttonText="More info"
              clickAction={() => {
                setDemo("daw");
              }}
              lang={
                <span className="double-lang-icons">
                  <span className="opengl-icon">
                    <LangIcon hasToolTip={false} name="OpenGL" imgSrc="icons/gl.svg" />
                  </span>
                  <LangIcon hasToolTip={false} name="Rust" imgSrc="icons/rust.svg" />
                </span>
              }
              buttonBrightness="2.2"
            />
            <ProjectPreview
              title="vol-applet"
              image="previews/volapp.webp"
              githubLink="https://github.com/jaspwr/vol-applet"
              description="A simple GTK system tray volume controller applet for PulseAudio."
              lang={<LangIcon hasToolTip={false} name="Rust" imgSrc="icons/rust.svg" />}
            />
            <ProjectPreview
              title="lilac"
              image="previews/lilac.png"
              githubLink="https://github.com/jaspwr/lilac"
              description="A transpiled frontend web meta-framework."
              clickAction={() => {
                setDemo("lilac");
              }}
              lang={
                <span className="double-lang-icons">
                  <LangIcon hasToolTip={false} name="Rust" imgSrc="icons/rust.svg" />
                  <LangIcon hasToolTip={false} imgSrc="/icons/js.svg" name="Javascript" />
                </span>
              }
            />
            <ProjectPreview
              title={<img id="lia-logo" src="icons/lia.png" alt="LiA" />}
              image="previews/lia.png"
              githubLink="https://github.com/jaspwr/LiA"
              description="
            A transpiled superset of TeX for writing LaTeX  designed to make LaTeX code less verbose and faster to write."
              clickAction={() => {
                setDemo("lia");
              }}
              lang={<LangIcon hasToolTip={false} name="Rust" imgSrc="icons/rust.svg" />}
              buttonBrightness="2.2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
