import React from "react";
import "./ProjectsTitle.css";

interface Props {
  scroll: number;
}

const ProjectsTitle = ({ scroll }: Props) => {
  const offsetting = scroll - 0.5;

  const letters = Array.from("Projects").map((c, i) => {
    // const opacity = Math.min(Math.max((offsetting * 1.2 + i*0.1 + 0.4),0),1);
    const posOffset = Math.min(offsetting * (i + 2), 0);
    const style: React.CSSProperties = {
      transform: `translateY(${-posOffset * 1.5}rem)`,
    };

    return <span className="title-letter" style={style}>{c}</span>;
  });

  return (
    <span className="heading-text bg-element projects-title">{letters}</span>
  );
};

export default ProjectsTitle;
