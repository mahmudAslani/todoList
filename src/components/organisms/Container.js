import React, { useEffect, useReducer } from "react";
import Typography from "../atoms/Typography";
import { FontStyle, initialTodos, TaskCategory } from "../../helper/constants";
import { todoReducer } from "../../hooks/todoReducer";
import Category from "./Category";

let todoRerenderTrigger = 10;
let doingRerenderTrigger = 20;
let doneRerenderTrigger = 0;
const Container = () => {
  const [state, dispatch] = useReducer(
    todoReducer,
    initialTodos,
    (initialTodos) => {
      const persistedSate = JSON.parse(localStorage.getItem("tasks"));
      return persistedSate !== null ? persistedSate : initialTodos;
    }
  );
  // when every category data changed we change rerenderTrigger variable and then
  // the component rerendered 
  if (state.rerenderTrigger.some((el) => el === TaskCategory.todo)) todoRerenderTrigger++;
  if (state.rerenderTrigger.some((el) => el === TaskCategory.doing))
    doingRerenderTrigger++;
  if (state.rerenderTrigger.some((el) => el === TaskCategory.done)) doneRerenderTrigger++;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  return (
    <div className="container ">
      <Typography fontStyle={FontStyle.head}>✓ Task List</Typography>
      <Typography fontStyle={FontStyle.title} lineHeight={"30px"}>
        Break your life to simple tasks to get things done! <br /> Does not
        matter how many tasks you done, It’s important to break to small tasks
        and be on progress.
      </Typography>
      <div className="wrapper">
        <Category
          data={state[TaskCategory.todo]}
          categoryName={TaskCategory.todo}
          dispatch={dispatch}
          key={todoRerenderTrigger}
        />
        <Category
          data={state[TaskCategory.doing]}
          categoryName={TaskCategory.doing}
          dispatch={dispatch}
          key={doingRerenderTrigger}
        />
        <Category
          data={state[TaskCategory.done]}
          categoryName={TaskCategory.done}
          dispatch={dispatch}
          key={doneRerenderTrigger}
        />
      </div>
    </div>
  );
};

export default Container;
