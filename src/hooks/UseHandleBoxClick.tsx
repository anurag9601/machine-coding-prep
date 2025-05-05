import React from "react";

const useHandleBoxClick = (
  eleRef: React.RefObject<HTMLDivElement | null>,
  handler: Function
) => {
  React.useEffect(() => {
    function handleContainerClick(e: MouseEvent) {
      if (eleRef.current && !eleRef.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleContainerClick);

    return () => {
      document.removeEventListener("mousedown", handleContainerClick);
    };
  }, [handler]);
};

export default useHandleBoxClick;
