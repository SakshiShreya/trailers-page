import { useState, useEffect } from "react";

/**
 * Returns height and width of window
 * @returns {{width: number; height: number}} height and width of window
 */
function getWindowDimensions() {
  const { clientWidth: width, clientHeight: height } = document.body;

  return {
    width,
    height
  };
}

/**
 * Hook that calculates and updates height and width on resize of window
 * @returns {{width: number, height: number}} height and width of window
 */
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
