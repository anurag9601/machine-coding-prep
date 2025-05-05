import React from "react";
import useMemoCustomHook from "../hooks/UseMemoCustomHook";

function doubleCountFunction(num: number) {
  console.log("Expensive call is happening...");
  for (let i = 0; i < 100000; i++) {}
  return num * 2;
}

const UseMemo = () => {
  const [input, setInput] = React.useState<string>("");
  const [count, setCount] = React.useState<number>(0);

  const doubleCount: number = useMemoCustomHook(
    () => doubleCountFunction(count),
    [count]
  );

  return (
    <div style={{ color: "#fff" }}>
      <h1>Count : {count}</h1>
      <h1>Double Count : {doubleCount}</h1>

      <div>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Increase count
        </button>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          value={input}
        />
      </div>
    </div>
  );
};

export default UseMemo;
