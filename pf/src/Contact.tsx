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
      </div>
    </div>
  );
};

export default Contact;
