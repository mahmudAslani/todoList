import React, { useEffect, useRef, useState } from "react";
import { addTodo } from "./svgs";
import Typography from "./Typography";
import { CREATETASK, FontStyle, TaskCategory } from "../../helper/constants";

function AddTask({ categoryName, dispatch }) {
  const [isShowInput, setShowInput] = useState(false);

  const ref = useRef();

  const createNewTask = (tasks) => {
    if (tasks.length === 0) return;
    dispatch({
      type: CREATETASK,
      payload: {
        categoryName,
        tasks: tasks,
      },
    });
    setShowInput(false);
  };
  useEffect(() => {
    isShowInput && ref.current.focus();
  });
  return (
    categoryName !== TaskCategory.done && (
      <>
        {isShowInput && (
          <div
            ref={ref}
            onBlur={(e) => {
              setShowInput(false);
            }}
            tabIndex={1}
            contentEditable
            className="task typography"
            placeholder="write your task then press ENTER to save that"
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                const tasks = e.target.innerText.split(/\r?\n/);
                createNewTask(tasks.filter((task) => task !== ""));
              }
            }}
          ></div>
        )}
        <div
          className="add-task"
          onClick={() => {
            setShowInput(true);
          }}
        >
          {addTodo}
          <Typography fontStyle={FontStyle.semiTitle}>New</Typography>
        </div>
      </>
    )
  );
}

export default AddTask;
