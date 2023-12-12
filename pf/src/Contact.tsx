import { depthStyle } from "./depthStyles";
import "./Contact.css";

interface Props {
  scroll: number;
}

const Contact = ({ scroll }: Props) => {
  if (scroll < 0.7) {
    return <></>;
  }

  const starAnimationDelay = {
    animationDelay: "1.2s",
  };

  return (
    <div className="whole-screen white-bg" style={depthStyle(scroll, 2.0, 1.0)}>
      <div className="contact-container">
        <div className="contact-title heading-text">
          <img
            className="star"
            style={starAnimationDelay}
            src="/decor/star.svg"
          />
          <span className="star-margin">Contact</span>
          <img className="star" src="/decor/star.svg" />
        </div>
        <div className="contact-subtext">
          Want to lock in? Contact me at any of the following. Hope to hear from
          you soon!
        </div>
        <div className="cont-details-container">
          <div className="cont-gh-icon">
            <img
              src="/icons/gh.svg"
              className="contact-icon"
              alt="Github icon"
            />
          </div>
          <div className="cont-gh-link cont-link">
            <a href="https://github.com/jaspwr">github.com/jaspwr</a>
          </div>
          <div className="cont-email-icon">
            <img
              src="/icons/mail.svg"
              className="contact-icon"
              alt="Email icon"
            />
          </div>
          <div className="cont-email-email cont-link">
            <a href="mainto:j@sperp.dev">j@sperp.dev</a>
          </div>
          <div className="cont-linkedin-icon">
            <img
              src="/icons/linkedin.svg"
              className="contact-icon"
              alt="LinkedIn icon"
            />
          </div>
          <div className="cont-linkedin-link cont-link">
            <a href="https://linkedin.com/in/jasper-parker-46a90826b/">
              linkedin.com/in/jasper-parker-46a90826b/
            </a>
          </div>
          <div className="cont-ph-icon"></div>
          <div className="cont-ph-number cont-link cont-link-no-hover">
            <a>+614 5557 8889</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
