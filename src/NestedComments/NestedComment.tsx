import React from "react";

import styles from "./NestedComments.module.css";
import Comment from "./Comment/Comment";

export interface commentsDataFormat {
  id: number;
  parentId: number;
  name: string;
  childrens: number[];
}

const NestedComment = () => {
  const [comments, setComments] = React.useState<{
    [key: number]: commentsDataFormat;
  }>({
    1: {
      id: 1,
      parentId: 1,
      name: "comments",
      childrens: [],
    },
  });

  return (
    <div className={styles.commentsContainer}>
      <h1>Nested Comments</h1>
      <Comment
        comment={comments[1]}
        allComments={comments}
        setComments={setComments}
      />
    </div>
  );
};

export default NestedComment;
