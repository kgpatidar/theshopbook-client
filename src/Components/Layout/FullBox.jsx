import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const FullBox = ({ className = "", children }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (ref.current) {
      const startTop = ref.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      setHeight(windowHeight - startTop - 16);
    }
  }, []);

  return (
    <div className={className} ref={ref} style={{ height: height }}>
      {children}
    </div>
  );
};

export default FullBox;
