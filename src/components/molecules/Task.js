import React, { useRef } from "react";
import Typography from "../atoms/Typography";
import { deleteSvg } from "../atoms/svgs";
import {
  DELETETASK,
  EDITTASK,
  FontStyle,
  TaskCategory,
} from "../../helper/constants";
import sleep from "../../helper/functions";
import { v4 as uuidv4 } from "uuid";

function Task({ data, dispatch, categoryName }) {
  const parentRef = useRef();
  const darggableRef = useRef();
  const handleEdit = (text, isChecked) => {
    dispatch({
      type: EDITTASK,
      payload: {
        id: data.id,
        categoryName,
        text: text ?? data.text,
        isChecked: isChecked,
      },
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({
      type: DELETETASK,
      payload: {
        categoryName,
        id: data.id,
      },
    });
  };
  const handleDragStart = (e) => {
    e.target.classList.add("hide");
    e.dataTransfer.setData(
      "object",
      JSON.stringify({ id: data.id, categoryName })
    );
  };
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "4px",
        userSelect: "element",
      }}
      className="parent"
      ref={parentRef}
      key={uuidv4()}
    >
      <div
        ref={darggableRef}
        className="task"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => {
          e.preventDefault();
          e.target.classList.remove("hide");
        }}
      >
        <div className="task--section-body">
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={categoryName === TaskCategory.done ? true : false}
            onClick={async (e) => {
              e.stopPropagation();
              parentRef.current.classList.add("fade-animation");
              await sleep(3000);
              handleEdit(null, e.target.checked);
            }}
          ></input>
          <Typography
            /* because FF has a bug with use draggable and contentEditable
          i used mousedown and mouse up event to dirty handle this FF bug!!*/
            onMouseDown={(e) => {
              e.stopPropagation();
              darggableRef.current.draggable = false;
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              darggableRef.current.draggable = true;
            }}
            onBlur={(e) => {
              handleEdit(
                e.target.innerText,
                categoryName === TaskCategory.done ? true : false
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEdit(
                  e.target.innerText,
                  categoryName === TaskCategory.done ? true : false
                );
              }
            }}
            contentEditable
            fontStyle={FontStyle.content}
          >
            {data?.text}
          </Typography>
          <div className="delete-icon" onClick={handleDelete}>
            {deleteSvg}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
