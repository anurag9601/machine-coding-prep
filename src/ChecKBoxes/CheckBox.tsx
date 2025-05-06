import React from "react";

interface allDataTypes {
  name: string;
  parent: null | number;
  id: number;
  childrens: number[];
  status: string;
  element: null | HTMLInputElement;
}

interface CheckBoxProps {
  currentData: allDataTypes;
  allData: { [key: string]: allDataTypes };
}

const CheckBox: React.FC<CheckBoxProps> = ({ currentData, allData }) => {
  function handleIndeterminateCheck(operation: string) {
    let allParents = [];
    let current = currentData;
    while (current.parent !== null) {
      if (current.parent !== 0) {
        allParents.push(current.parent);
      }
      current = allData[current.parent];
    }

    allParents.forEach((parentId) => {
      const allChildren = allData[parentId].childrens;

      const queue: number[] = [...allChildren];

      let isChecked = true;

      while (queue.length > 0) {
        const currentChild = queue.shift();
        if (currentChild) {
          queue.push(...allData[currentChild].childrens);
          if (
            allData[currentChild].status !== operation &&
            allData[parentId].element
          ) {
            allData[parentId].element.indeterminate = true;
            isChecked = false;
            break;
          }
        }
      }

      if (allData[parentId].element && isChecked) {
        allData[parentId].element.indeterminate = false;
        allData[parentId].status = operation;
        allData[parentId].element.checked = operation === "checked";
      }
    });
  }

  function handleCheckAllChild(checked: boolean) {
    let queue = [currentData.id, ...currentData.childrens];

    while (queue.length > 0) {
      const childId = queue.shift();
      if (childId && allData[childId].element) {
        queue.push(...allData[childId].childrens);
        allData[childId].status = checked === true ? "checked" : "unchecked";
        allData[childId].element.checked = checked === true ? true : false;
      }
    }
  }

  function handleCheck() {
    currentData.status =
      currentData.status === "checked" ? "unchecked" : "checked";
    handleCheckAllChild(currentData.status === "checked");
    handleIndeterminateCheck(currentData.status);
  }

  return (
    <div key={currentData.id} style={{ paddingLeft: "20px" }}>
      {currentData.id !== 0 && (
        <div>
          <input
            type="checkbox"
            style={{ marginRight: "5px" }}
            ref={(e) => {
              if (e) {
                currentData.element = e;
              }
            }}
            onChange={() => handleCheck()}
          />
          {currentData.name}
        </div>
      )}
      {currentData.childrens.length > 0 &&
        currentData.childrens.map((childId: number) => {
          return <CheckBox currentData={allData[childId]} allData={allData} />;
        })}
    </div>
  );
};

export default CheckBox;
