import { createContext } from "react";

const tasksContext = createContext({
  taskInfo: {},
  setTaskInfo: (taskInfo) => {}
});

export default tasksContext;