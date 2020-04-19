import { createTask } from "../states/ITask";
import { IState, initialState } from "../IState";
import { ITask } from "../states/ITask";
import {
  SHOW_TASKS,
  ADD_TASK,
  TOGGLE_COMPLETE_TASK,
  DELETE_TASK,
  TOGGLE_SHOW_SPINNER,
  TaskActions,
} from "../actions/TaskActions";

const addTask = (tasks: ITask[], taskName: string, deadline: Date) => {
  return [...tasks, createTask(taskName, deadline)];
};

const toggleCompleteTask = (tasks: ITask[], taskId: string) => {
  const target = tasks.findIndex((it) => it.id === taskId);
  if (target < 0) {
    return;
  }
  return tasks.map((task, index) => {
    return index === target
      ? {
          ...task,
          complete: !task.complete,
        }
      : task;
  });
};

const deleteTask = (tasks: ITask[], taskId: string) => {
  const target = tasks.findIndex((it) => it.id === taskId);
  if (target < 0) {
    return;
  }
  return tasks.filter((it, index) => index !== target);
};

const updateTasks = (state: IState, tasks?: ITask[]) => {
  return !!tasks
    ? {
        ...state,
        taskList: {
          ...state.taskList,
          tasks: tasks,
        },
      }
    : state;
};

const toggleShowLoading = (state: IState) => {
  return {
    ...state,
    taskList: {
      ...state.taskList,
      shownLoading: !state.taskList.shownLoading,
    },
  };
};

const reducer = (state: IState = initialState, action: TaskActions) => {
  switch (action.type) {
    case SHOW_TASKS:
      return updateTasks(state, action.tasks);
    case ADD_TASK:
      return updateTasks(
        state,
        addTask(state.taskList.tasks, action.taskName, action.deadline)
      );
    case TOGGLE_COMPLETE_TASK:
      return updateTasks(
        state,
        toggleCompleteTask(state.taskList.tasks, action.taskId)
      );
    case DELETE_TASK:
      return updateTasks(
        state,
        deleteTask(state.taskList.tasks, action.taskId)
      );
    case TOGGLE_SHOW_SPINNER:
      return toggleShowLoading(state);
    default:
      return state;
  }
};

export default reducer;
