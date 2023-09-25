import React, { memo } from "react";
import {
  CAHNGETODOINDEX,
  FontStyle,
} from "../../helper/constants";
import Typography from "../atoms/Typography";
import Task from "../molecules/Task";
import AddTask from "../atoms/AddTask";

function Category({ categoryName, data, dispatch }) {
  const handleOnDrop = (e) => {
    e.preventDefault();
    const transferedData = JSON.parse(e.dataTransfer.getData("object"));
    const index = [].indexOf.call(e.target.parentNode.children, e.target);
    dispatch({
      type: CAHNGETODOINDEX,
      payload: {
        id: transferedData.id,
        oldCategoryName: transferedData.categoryName,
        categoryName,
        index: index,
      },
    });
  };
  return (
    <div
      id="category"
      categoryname={categoryName}
      onDragOverCapture={(e) => {
        e.preventDefault();
      }}
      onDropCapture={handleOnDrop}
    >
      <div className="category__head">
        <Typography fontStyle={FontStyle.title}>Todo</Typography>
        <Typography fontStyle={FontStyle.subContent}>
          {data.length} Tasks
        </Typography>
      </div>
      <div className="category__body">
        {data.map((element, index) => {
          return (
            <Task
              data={element}
              key={index + categoryName}
              dispatch={dispatch}
              categoryName={categoryName}
            />
          );
        })}
        <AddTask categoryName={categoryName} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default memo(Category);
