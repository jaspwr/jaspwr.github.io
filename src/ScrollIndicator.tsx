import "./ScrollIndicator.css";

import { useWindowSize } from "@uidotdev/usehooks";

const ScrollIndicator = () => {
  const size = useWindowSize();

  if (size.width !== null) {
    document.documentElement.style.setProperty(
      "--bg-element-opacity",
      size.width > 1100 ? "1.0" : "0.0"
    );
  }

//   const scrollIndicatorStyle: React.CSSProperties = {
//     opacity: Math.cos(scroll * Math.PI * 2 * 2) * 0.5,
//   };

//   let scrollIndicatorText = "Projects";

//   if (scroll > 1 / 3) {
//     scrollIndicatorText = "Contact";
//   }

//   if (scroll > 2 / 3) {
//     scrollIndicatorStyle.opacity = 0;
//   }

  //   return (
  //     <span className="scroll-indicator" style={scrollIndicatorStyle}>
  //       {scrollIndicatorText}
  //     </span>
  //   );
  return <></>;
};

export default ScrollIndicator;
