import React from "react";
import styles from "./Comment.module.css";
import { commentsDataFormat } from "../NestedComment";

type CommentProps = {
  comment: commentsDataFormat;
  allComments: {
    [key: number]: commentsDataFormat;
  };
  setComments: React.Dispatch<
    React.SetStateAction<{
      [key: number]: commentsDataFormat;
    }>
  >;
};
const Comment: React.FC<CommentProps> = ({
  comment,
  allComments,
  setComments,
}) => {
  const [replyBoxVisible, setReplyBoxVisible] = React.useState<boolean>(false);

  const replyRef = React.useRef<HTMLInputElement | null>(null);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyRef.current) return;

    const reply = replyRef.current.value;

    if (reply.length === 0) {
      alert("Input field is empty");
      return;
    }

    setComments((prev) => {
      const updatedComments = { ...prev };
      const commentId: number = Date.now();
      updatedComments[commentId] = {
        id: commentId,
        parentId: comment.id,
        name: reply,
        childrens: [],
      };
      updatedComments[comment.id].childrens.push(commentId);
      return updatedComments;
    });

    replyRef.current.value = "";
    setReplyBoxVisible(false);
  };

  const handleDelete = () => {
    setComments((prev) => {
      let updatedComments = { ...prev };

      updatedComments[comment.parentId].childrens = updatedComments[
        comment.parentId
      ].childrens.filter((child) => child != comment.id);

      let queue = [...updatedComments[comment.id].childrens];

      delete updatedComments[comment.id];

      while (queue.length > 0) {
        const currentComment = queue.shift();
        if (currentComment) {
          queue.push(...updatedComments[currentComment].childrens);
          delete updatedComments[currentComment];
        }
      }

      return updatedComments;
    });
  };

  React.useEffect(() => {
    if (replyRef.current) {
      replyRef.current.focus();
    }
  }, [replyBoxVisible]);

  return (
    <div className={styles.commentContainer}>
      <div className={styles.comment}>
        {comment.name}
        <span
          className={styles.reply}
          onClick={() => setReplyBoxVisible((prev) => !prev)}
        >
          {replyBoxVisible === true ? "Cancel" : "Reply"}
        </span>{" "}
        {comment.id !== 1 && (
          <span className={styles.delete} onClick={handleDelete}>
            Delete
          </span>
        )}
      </div>
      {replyBoxVisible === true && (
        <form className={styles.replyBox} onSubmit={handleSendReply}>
          <input ref={replyRef}></input>
          <button>Send Reply</button>
        </form>
      )}

      {comment.childrens.length > 0 &&
        comment.childrens.map((commentId) => {
          return (
            <Comment
              comment={allComments[commentId]}
              allComments={allComments}
              setComments={setComments}
            />
          );
        })}
    </div>
  );
};

export default Comment;
