import React from "react";
import styles from "./ScrollProgress.module.css";

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPrecentage] = React.useState<number>(0);
  function handleContainerOnScroll(e: React.UIEvent<HTMLDivElement>) {
    const scrollTop = e.target.scrollTop;
    const containerHeight = e.target.scrollHeight;
    const screenHeight = e.target.clientHeight;
    const totalScrollHeight = containerHeight - screenHeight;

    const percentageScroll = Math.floor((scrollTop / totalScrollHeight) * 100);
    setScrollPrecentage(percentageScroll);
  }

  console.log(scrollPercentage);

  return (
    <div className={styles.scrollContainer} onScroll={handleContainerOnScroll}>
      <div className={styles.scrollNavigator}>
        <div
          className={styles.navigator}
          style={{ width: `${scrollPercentage}%` }}
        ></div>
      </div>
      <div className={styles.page1}></div>
      <div className={styles.page2}></div>
      <div className={styles.page3}></div>
    </div>
  );
};

export default ScrollProgress;
