import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Scroll from "./InfiniteScroll/Scroll/Scroll";

function App() {
  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route path="/infinite-scroll" element={<Scroll />} />
      </Routes>
    </div>
  );
}

export default App;
