import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Scroll from "./InfiniteScroll/Scroll/Scroll";
import BackTrack from "./BackTrack/BackTrack";
import VirtualScroll from "./VirtualScroll/VirtualScroll";
import MemoryGame from "./MemoryGame/MemoryGame";
import NestedComment from "./NestedComments/NestedComment";
import TrafficLight from "./TrafficLight/TrafficLight";

function App() {
  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route path="/infinite-scroll" element={<Scroll />} />
        <Route path="/backtrack" element={<BackTrack />} />
        <Route
          path="/virtual-scroll"
          element={<VirtualScroll height={500} width={300} />}
        />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/nested-comment" element={<NestedComment />} />
        <Route path="/traffic-light" element={<TrafficLight />} />
      </Routes>
    </div>
  );
}

export default App;
