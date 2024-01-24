export const depthStyle = (scroll: number, z: number, stage: number) => {
  const depth = z - scroll;
  const focus = scroll - stage;

    let opacity = 1 - Math.abs(focus);
    if (focus < 0) opacity *= Math.pow(opacity,8);

  const styles: React.CSSProperties = {
    transform: `scale(${depth})`,
    filter: `blur(${Math.abs(focus) * 10}px)`,
    opacity: `${opacity}`,
    transition: 'none',
  };

  if (Math.abs(focus) < 0.05) {
    styles.filter = undefined;
    styles.opacity = undefined;
  }

  return styles;
};
