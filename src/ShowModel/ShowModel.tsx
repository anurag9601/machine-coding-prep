import React from "react";
import styles from "./ShowModel.module.css";
import ShowBox from "./ShowBox";

const ShowModel = () => {
  const [showBox, setShowBox] = React.useState<boolean>(true);

  function closeMode() {
    setShowBox(false);
  }

  return (
    <div className={styles.showModelContainer}>
      {!showBox && (
        <button
          className={styles.showModelBtn}
          onClick={() => setShowBox(true)}
        >
          Show Model
        </button>
      )}
      {showBox && <ShowBox closeMode={closeMode} />}
    </div>
  );
};

export default ShowModel;
