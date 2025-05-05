import { useRef } from "react";
import styles from "./ShowModel.module.css";
import useHandleBoxClick from "../hooks/UseHandleBoxClick";

interface ShowBoxProps {
  closeMode: () => void;
}

const ShowBox = ({ closeMode }: ShowBoxProps) => {
  const modelRef = useRef<HTMLDivElement | null>(null);

  useHandleBoxClick(modelRef, closeMode);

  return (
    <div className={styles.showBox} ref={modelRef}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
        necessitatibus unde consectetur, eius vero quis maiores dicta minus
        similique sint commodi et inventore ratione odio accusamus voluptas
        laborum minima maxime?
      </p>
      <button onClick={closeMode}>Close</button>
    </div>
  );
};

export default ShowBox;
