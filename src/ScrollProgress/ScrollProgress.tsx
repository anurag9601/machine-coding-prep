import React from "react";
import styles from "./ScrollProgress.module.css";

const ScrollProgress = () => {
  const pageContainerRef = React.useRef<HTMLDivElement | null>(null);

  const handleContainerOnScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = pageContainerRef.current;

    if (container) {
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;

      const progressHeight = Math.floor(
        (scrollTop / (scrollHeight - clientHeight)) * 100
      );

      console.log("progressHeight", progressHeight);
    }
  };
  return (
    <div
      className={styles.pageContainer}
      ref={pageContainerRef}
      onScroll={handleContainerOnScroll}
    >
      <div className={styles.page1}>
        <h1>Page No 1</h1>
      </div>
      <div className={styles.page2}>
        <h1>Page No 2</h1>
      </div>
      <div className={styles.page3}>
        <h1>Page No 3</h1>
      </div>
      <div className={styles.progressBox}></div>
    </div>
  );
};

export default ScrollProgress;
