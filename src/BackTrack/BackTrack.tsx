import React from "react";
import styles from "./BackTrack.module.css";
import Box from "./Box/Box";

const BackTrack = () => {
  const GRID_LENGTH = 9;
  const [boxes, setBoxes] = React.useState<boolean[] | []>(
    Array.from({ length: GRID_LENGTH }).fill(false) as boolean[]
  );

  const backTrackingIndex = React.useRef<number[]>([]);

  const effectStart = React.useRef<boolean>(false);

  function handleBoxClick(index: number) {
    if (boxes[index] !== false || effectStart.current === true) return;
    setBoxes((prev) => {
      const updatedBox = [...prev];
      updatedBox[index] = true;
      return updatedBox;
    });

    backTrackingIndex.current.push(index);
  }

  React.useEffect(() => {
    if (backTrackingIndex.current.length == GRID_LENGTH) {
      effectStart.current = true;
      const interval = setInterval(() => {
        if (backTrackingIndex.current.length == 0) {
          effectStart.current = false;
          clearInterval(interval);
        } else {
          setBoxes((prev) => {
            const updatedBox = [...prev];
            updatedBox[backTrackingIndex.current[0]] = false;
            backTrackingIndex.current.shift();
            return updatedBox;
          });
        }
      }, 1000);
    }
  }, [boxes]);

  console.log(backTrackingIndex.current);

  console.log("box", boxes);
  return (
    <div className={styles.boxesContainer}>
      <div className={styles.boxes}>
        {boxes.map((boxGlow, index) => (
          <Box
            boxGlow={boxGlow}
            index={index}
            handleBoxClick={handleBoxClick}
          />
        ))}
      </div>
    </div>
  );
};

export default BackTrack;
