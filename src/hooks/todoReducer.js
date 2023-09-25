import { v4 as uuidv4 } from "uuid";
import {
  CAHNGETODOINDEX,
  CREATETASK,
  DELETETASK,
  EDITTASK,
  TaskCategory,
} from "../helper/constants";

export const todoReducer = (state, action) => {
  const newState = state;
  switch (action.type) {
    /*  ===========================================================
                   edit or update task
        =========================================================== */
    case EDITTASK:
      const { id, text, categoryName, isChecked } = action.payload;
      /*  isCkecked = false && categoryName !== done or isChecked =true and
     categoryName = done thats means it doesn't need to change its category */
      if (
        (isChecked === false && categoryName !== TaskCategory.done) ||
        (isChecked === true && categoryName === TaskCategory.done)
      ) {
        newState[categoryName] = newState[categoryName].map((task) => {
          if (task.id === id) {
            return {
              id: id,
              text: text,
            };
          } else {
            return task;
          }
        });
      } else {
        newState[categoryName] = newState[categoryName].filter((task) => {
          return task.id !== id;
        });
        isChecked
          ? newState[TaskCategory.done].splice(0, 0, {
              id: id,
              text: text,
            })
          : newState[TaskCategory.todo].splice(0, 0, {
              id: id,
              text: text,
            });
      }
      newState.rerenderTrigger = [
        categoryName,
        isChecked ? TaskCategory.done : TaskCategory.todo,
      ];
      return { ...newState };
    /*  ===========================================================
                   sort or chnage category
        =========================================================== */
    case CAHNGETODOINDEX: {
      const newState = state;
      let changingTask = {};
      const { id, oldCategoryName, categoryName, index } = action.payload;
      const isSort = oldCategoryName === categoryName;
      // remove and get changing task
      newState[oldCategoryName] = newState[oldCategoryName].filter((task) => {
        if (task.id === id) {
          changingTask = task;
        }
        return task.id !== id;
      });
      // add changing task to new indexed position
      newState[categoryName].splice(isSort ? index : 0, 0, changingTask);

      newState.rerenderTrigger = [categoryName, oldCategoryName];
      return { ...newState };
    }
    /*  ===========================================================
                 create new task
        =========================================================== */
    case CREATETASK:
      if (typeof action.payload.tasks !== "object") {
        return state;
      }
      const newTasks = action.payload.tasks.map((task) => {
        return { id: uuidv4(), text: task };
      });
      newState[action.payload.categoryName].splice(0, 0, ...newTasks);
      newState.rerenderTrigger = [action.payload.categoryName];
      return { ...newState };
    /*  ===========================================================
                   delete task
        =========================================================== */
    case DELETETASK:
      newState[action.payload.categoryName] = newState[
        action.payload.categoryName
      ].filter((task) => {
        return task.id !== action.payload.id;
      });
      newState.rerenderTrigger = [action.payload.categoryName];
      return { ...newState };
    default:
      return state;
  }
};
