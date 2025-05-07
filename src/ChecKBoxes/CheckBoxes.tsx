import jsonData from "./data.json";
import CheckBox from "./CheckBox";

const CheckBoxes = () => {
  const data = jsonData;

  return (
    <div style={{ color: "#fff" }}>
      <CheckBox currentData={data[0]} allData={data} />
    </div>
  );
};

export default CheckBoxes;
