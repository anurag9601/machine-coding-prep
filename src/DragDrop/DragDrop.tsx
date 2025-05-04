import { useState } from "react";
import styles from "./DragDrop.module.css";

interface todoDataType {
  todo: string;
  type: "todo" | "progress" | "completed";
}

const DragDrop = () => {
  const [todos, setTodos] = useState<todoDataType[]>([
    {
      todo: "Complete the project report",
      type: "todo",
    },
    {
      todo: "Prepare slides for presentation",
      type: "todo",
    },
    {
      todo: "Fix bugs in the login feature",
      type: "todo",
    },
    {
      todo: "Update resume with latest project",
      type: "todo",
    },
    {
      todo: "Study for the upcoming exam",
      type: "todo",
    },
    {
      todo: "Respond to client emails",
      type: "todo",
    },
    {
      todo: "Push latest code to GitHub",
      type: "todo",
    },
    {
      todo: "Attend team meeting at 4 PM",
      type: "todo",
    },
    {
      todo: "Backup important files",
      type: "todo",
    },
    {
      todo: "Research on scalable app architecture",
      type: "todo",
    },
  ]);

  const todo = todos.filter((todo) => {
    return todo.type === "todo";
  });

  const inProgress = todos.filter((todo) => {
    return todo.type === "progress";
  });

  const completed = todos.filter((todo) => {
    return todo.type === "completed";
  });

  function handleOnDropInTodoList(e: React.DragEvent) {
    e.preventDefault();
    const data = e.dataTransfer.getData("todoData");
    const todo = JSON.parse(data);
    setTodos((prev) => {
      const updatedTodo = [...prev];
      updatedTodo.map((prevTodo) => {
        if (prevTodo.todo == todo.todo) {
          prevTodo.type = "todo";
        }
      });
      return updatedTodo;
    });
  }
  function handleOnDropInProgressList(e: React.DragEvent) {
    e.preventDefault();
    const data = e.dataTransfer.getData("todoData");
    const todo = JSON.parse(data);
    setTodos((prev) => {
      const updatedTodo = [...prev];
      updatedTodo.map((prevTodo) => {
        if (prevTodo.todo == todo.todo) {
          prevTodo.type = "progress";
        }
      });
      return updatedTodo;
    });
  }
  function handleOnDropInCompletedList(e: React.DragEvent) {
    e.preventDefault();
    const data = e.dataTransfer.getData("todoData");
    const todo = JSON.parse(data);
    setTodos((prev) => {
      const updatedTodo = [...prev];
      updatedTodo.map((prevTodo) => {
        if (prevTodo.todo == todo.todo) {
          prevTodo.type = "completed";
        }
      });
      return updatedTodo;
    });
  }
  return (
    <div className={styles.dragDropContainer}>
      <div className={styles.dragDropBox}>
        <h1>Todo</h1>
        <div
          className={styles.list}
          onDrop={handleOnDropInTodoList}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {todo.length > 0 &&
            todo.map((todo, index) => (
              <div
                className={styles.todo}
                draggable
                key={`${todo.todo}-${index}`}
                onDragStart={(e) => {
                  e.dataTransfer.setData("todoData", JSON.stringify(todo));
                }}
              >
                {todo.todo}
              </div>
            ))}
        </div>
      </div>
      <div className={styles.dragDropBox}>
        <h1>In Progress</h1>
        <div
          className={styles.list}
          onDrop={handleOnDropInProgressList}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {inProgress.length > 0 &&
            inProgress.map((todo: todoDataType, index) => (
              <div
                className={styles.todo}
                draggable
                key={`${todo.todo}-${index}`}
                onDragStart={(e) => {
                  e.dataTransfer.setData("todoData", JSON.stringify(todo));
                }}
              >
                {todo.todo}
              </div>
            ))}
        </div>
      </div>
      <div className={styles.dragDropBox}>
        <h1>Completed</h1>
        <div
          className={styles.list}
          onDrop={handleOnDropInCompletedList}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {completed.length > 0 &&
            completed.map((todo, index) => (
              <div
                className={styles.todo}
                draggable
                key={`${todo.todo}-${index}`}
                onDragStart={(e) => {
                  e.dataTransfer.setData("todoData", JSON.stringify(todo));
                }}
              >
                {todo.todo}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
