import { useEffect, useState } from "react";

function useResize() {
  const [hide, setHide] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function updateDimensions() {
    if (window.innerWidth >= 700) {
      setHide(true);
    }
  }
  function onToggleNav() {
    setHide((hidden) => !hidden);
  }

  return { hide, onToggleNav };
}

export { useResize };
