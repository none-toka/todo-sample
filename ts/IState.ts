import { ITaskList, initTaskList } from "./states/ITask";
/**
 * store のデータ型を定義する。（親state）
 *
 * プロパティには、管理する child_state を指定する
 */
export interface IState {
  taskList: ITaskList;
}

export const initialState: IState = { taskList: initTaskList };
