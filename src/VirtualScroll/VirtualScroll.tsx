import React from "react";
import styles from "./VirtualScroll.module.css";
import Item from "./Item/Item";

interface VirtualScrollProps {
  height: number;
  width: number;
}

const VirtualScroll: React.FC<VirtualScrollProps> = ({ height, width }) => {
  const LIST_LENGTH = 100000;
  const ITEM_HEIGHT = 40;
  const itmes = Array.from(
    { length: LIST_LENGTH },
    (_, index: number) => index + 1
  );

  const [indices, setIndices] = React.useState<number[]>([
    0,
    Math.floor(height / ITEM_HEIGHT) + 5,
  ]);

  function handleBoxOnScroll(e: any) {
    const { scrollTop } = e.target;

    const firstIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const seondIndex = firstIndex + Math.floor(height / ITEM_HEIGHT) + 5;

    setIndices(() => {
      return [firstIndex, seondIndex];
    });
  }
  return (
    <div className={styles.virtualScrollContainer}>
      <div
        style={{ height, width, background: "gray", overflowY: "auto" }}
        onScroll={handleBoxOnScroll}
      >
        <div
          style={{ height: itmes.length * ITEM_HEIGHT, position: "relative" }}
        >
          {itmes.slice(indices[0], indices[1]).map((num, index) => {
            return (
              <Item
                num={num}
                itemHeight={ITEM_HEIGHT}
                index={index}
                indices={indices}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VirtualScroll;
