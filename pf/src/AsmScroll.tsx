import React, { useState, useEffect } from 'react';
import './AsmScroll.css';

const TEXT = 'Hello, World!\n\nasdjkh\n\nasdhjkkj\n\n'.repeat(1000);

const AsmScroll = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setScrollPos(scrollPos + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const displayText = TEXT.split('\n\n').splice(scrollPos).join('\n\n');

  return (
    <div className='asm-scroll bg-element'>
      <div className='asm-overlay'></div>
      <p>{displayText}</p>
    </div>
  );
};

export default AsmScroll;