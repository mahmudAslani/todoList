import { v4 as uuidv4 } from "uuid";
export const EDITTASK = "editTodo";
export const CREATETASK = "createTodo";
export const CAHNGETODOINDEX = "changeIndex";
export const DELETETASK = "DeleteTask";

export const TaskCategory = {
  todo: "todo",
  doing: "doing",
  done: "done",
};

export const FontStyle = {
  head: "head",
  title: "title",
  subTittle: "subTitle",
  semiTitle: "semiTitle",
  content: "content",
  subContent: "subContent",
};

export const initialTodos = {
  todo: [
    {
      id: uuidv4(),
      text: "Start with meditation, exercise & breakfast for a productive day",
    },
    {
      id: uuidv4(),
      text: "Read to learn something new every day",
    },
    {
      id: uuidv4(),
      text: "Learn something fresh & relevant",
    },
  ],
  doing: [
    {
      id: uuidv4(),
      text: "Engage & question in meetings",
    },
    {
      id: uuidv4(),
      text: "Use time-blocking for effective days",
    },
  ],
  done: [
    {
      id: uuidv4(),
      text: "Finished online course - check!",
    },
    {
      id: uuidv4(),
      text: "Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating",
    },
  ],
  rerenderTrigger: ["todo", "doing", "done"],
};
