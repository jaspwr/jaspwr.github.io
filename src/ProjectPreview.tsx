import React, { memo } from "react";
import "./ProjectPreview.css";

interface Props {
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
  lang: React.ReactNode;
  githubLink: string;
  clickAction?: () => void;
  buttonBrightness?: string;
}

const ProjectPreview = memo((props: Props) => {
  const image = (
    <div
      className={`image clickable-image`}
      onClick={() => window.open(props.githubLink, '_blank')?.focus()}
    >
      <div className="side-grad"></div>
      <img className="preview-image" src={props.image} alt="project preview" />
    </div>
  );

  return (
    <div className="shadowed-container project-preview container">
      <div className="gh-link">
        <a href={props.githubLink} target="_blank" rel="noopener noreferrer">
          <img className="gh-link-icon" src="icons/gh.svg" alt="github" />
        </a>
      </div>
      {image}
      <div className="description">
        {
          <>
            <>{props.description}</>
            <>
              {props.clickAction && (
                <div onClick={props.clickAction} className="demo-button">
                  Open live demo
                </div>
              )}
            </>
          </>
        }
      </div>
      <div className="title heading-text">{props.title}</div>
      <div className="lang">{props.lang}</div>
    </div>
  );
});

export default ProjectPreview;
