import React from "react";
import styles from "./MemoryGame.module.css";
import { handleGetData } from "./functions/function";

interface dataType {
  id: number;
  imgURL: string;
  turned: boolean;
}

const MemoryGame = () => {
  const [data, setData] = React.useState<dataType[]>(handleGetData());

  const flipIndex = React.useRef<number[]>([]);

  function handleClickOnCard(index: number) {
    if (flipIndex.current.length === 2) return;
    setData((prev) => {
      const updatedData = [...prev];
      updatedData[index].turned = true;
      flipIndex.current.push(index);
      return updatedData;
    });
  }

  React.useEffect(() => {
    if (flipIndex.current.length === 2) {
      const flipIndexes = flipIndex.current;
      const timeOut = setTimeout(() => {
        if (data[flipIndexes[0]].imgURL !== data[flipIndexes[1]].imgURL) {
          setData((prev) => {
            const updatedData = [...prev];
            updatedData[flipIndexes[0]].turned = false;
            updatedData[flipIndexes[1]].turned = false;
            return updatedData;
          });
        } else {
          alert("It's a match 👍");
        }
        clearTimeout(timeOut);
        flipIndex.current = [];
      }, 2 * 1000);
    }
  }, [data]);

  return (
    <div className={styles.gameContainer}>
      <h1>Memory Game</h1>
      <div className={styles.boxContainer}>
        {data.map((e, index) => {
          return (
            <div key={index}>
              {e.turned == true ? (
                <img
                  src={e.imgURL}
                  alt="img"
                  height={50}
                  width={50}
                  className={`${e.turned === true && styles.flipAnimation}`}
                />
              ) : (
                <div
                  className={styles.blankBox}
                  onClick={() => handleClickOnCard(index)}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
