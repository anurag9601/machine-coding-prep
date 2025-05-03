import React from "react";

const TrafficLight = () => {
  const [onLight, setOnLight] = React.useState<"stop" | "slow" | "go" | "">("");

  const intervalRef = React.useRef<number | null>(null);

  function handleOnAllLights() {
    let list: any = ["stop", "slow", "go"];
    let index = -1;

    intervalRef.current = setInterval(() => {
      if (index == 2) {
        index = 0;
      } else {
        index += 1;
      }

      setOnLight(() => {
        return list[index];
      });
    }, 1000);
  }

  function handleOtherBtns(command: any) {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setOnLight(command);
  }

  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            border: "1px solid #fff",
            background: `${onLight === "stop" ? "red" : "transparent"}`,
          }}
        ></div>
        <div
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            border: "1px solid #fff",
            background: `${onLight === "slow" ? "yellow" : "transparent"}`,
          }}
        ></div>
        <div
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            border: "1px solid #fff",
            background: `${onLight === "go" ? "green" : "transparent"}`,
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <button
          style={{
            height: "35px",
            width: "100px",
            border: "none",
            outline: "none",
            borderRadius: "5px",
            color: "#fff",
            background: "red",
            cursor: "pointer",
          }}
          onClick={() => handleOtherBtns("stop")}
        >
          Stop
        </button>
        <button
          style={{
            height: "35px",
            width: "100px",
            border: "none",
            outline: "none",
            borderRadius: "5px",
            color: "#000",
            background: "yellow",
            cursor: "pointer",
          }}
          onClick={() => handleOtherBtns("slow")}
        >
          Slow
        </button>
        <button
          style={{
            height: "35px",
            width: "100px",
            border: "none",
            outline: "none",
            borderRadius: "5px",
            color: "#fff",
            background: "green",
            cursor: "pointer",
          }}
          onClick={() => handleOtherBtns("go")}
        >
          Go
        </button>
        <button
          style={{
            height: "35px",
            width: "100px",
            border: "none",
            outline: "none",
            borderRadius: "5px",
            color: "#000",
            background: "white",
            cursor: "pointer",
          }}
          onClick={handleOnAllLights}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default TrafficLight;
