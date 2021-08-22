import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { clientWidth: width, clientHeight: height } = document.body;

  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      const dimensions = getWindowDimensions();

      if (dimensions.height !== windowDimensions.height || dimensions.width !== windowDimensions.width) {
        setWindowDimensions(getWindowDimensions());
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
}
