import React from "react";
import jsonData from "./data.json";
import CheckBox from "./CheckBox";

const CheckBoxes = () => {
  const data = jsonData;

  React.useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div style={{ color: "#fff" }}>
      <CheckBox currentData={data[0]} allData={data} />
    </div>
  );
};

export default CheckBoxes;
