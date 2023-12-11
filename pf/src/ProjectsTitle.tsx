import React from "react";
import "./ProjectsTitle.css";

interface Props {
  scroll: number;
}

const ProjectsTitle = ({ scroll }: Props) => {
    const offsetting = scroll - 0.5;
    console.log(scroll);

  const letters = Array.from("Projects").map((c, i) => {
    // const opacity = Math.min(Math.max((offsetting * 1.2 + i*0.1 + 0.4),0),1);
    const posOffset = Math.min(offsetting * (i+2) , 0);
    const style: React.CSSProperties = {
        opacity: 1,
        transform: `translateY(${-posOffset * 1.5}rem)`,
        position: "relative",
        display: "inline-block"
    }

    return <span style={style}>{c}</span>;
  });

  return (
    <span className="heading-text bg-element projects-title">{letters}</span>
  );
};

export default ProjectsTitle;
