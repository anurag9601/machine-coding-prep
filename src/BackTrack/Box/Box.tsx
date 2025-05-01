import React from "react";
import styles from "./Box.module.css";

interface BoxProps {
  boxGlow: boolean;
  index: number;
  handleBoxClick: (index: number) => void;
}

const Box: React.FC<BoxProps> = ({ boxGlow, index, handleBoxClick }) => {
  return (
    <div
      className={`${styles.boxContainer} ${boxGlow === true && styles.boxFilled}`}
      onClick={() => handleBoxClick(index)}
      key={index}
    >
    </div>
  );
};

export default Box;
