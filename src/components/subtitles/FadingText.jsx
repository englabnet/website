import React, { useRef, useState, useEffect } from 'react';
import { Text } from "@mantine/core";
import classes from './FadingText.module.css';

export default function FadingText({ truncateEnd = false, c = 'black', children }) {
  const textRef = useRef(null);
  const [overflow, setOverflow] = useState(false);

  const checkOverflow = () => {
    const text = textRef.current;
    text.style.textIndent = 0;
    const overflowWidth = text.scrollWidth - text.clientWidth;
    if (overflowWidth > 0 && !truncateEnd) {
      text.style.textIndent = `-${overflowWidth}px`;
    }
    setOverflow(overflowWidth > 0);
  };

  useEffect(() => {
    window.addEventListener('resize', checkOverflow);

    checkOverflow();
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [])

  useEffect(() => {
    checkOverflow();
  }, [children]);

  return (
    <Text
      ref={textRef}
      size="lg"
      ta="center"
      w='100%'
      mih={30}
      c={c}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
      className={overflow ? (truncateEnd ? classes.rightFading : classes.leftFading) : ''}
    >
      {children}
    </Text>
  );
}
