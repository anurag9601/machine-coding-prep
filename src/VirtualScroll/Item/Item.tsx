interface ItemProps {
  num: number;
  itemHeight: number;
  index: number;
  indices: number[];
}

const Item: React.FC<ItemProps> = ({ num, itemHeight, index, indices }) => {
  return (
    <div
      style={{
        height: itemHeight,
        background: "orange",
        borderTop: "2px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "cursive",
        position: "absolute",
        width: "100%",
        transform: `translateY(${(indices[0] + index) * itemHeight}px)`,
      }}
    >
      {num} Item
    </div>
  );
};

export default Item;
