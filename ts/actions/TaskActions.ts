import { ITask } from "../states/ITask";
export const SHOW_TASKS = "SHOW_TASKS" as const;
export const ADD_TASK = "ADD_TASK" as const;
export const TOGGLE_SHOW_SPINNER = "TOGGLE_SHOW_SPINNER" as const;
export const TOGGLE_COMPLETE_TASK = "TOGGLE_COMPLETE_TASK" as const;
export const DELETE_TASK = "DELETE_TASK" as const;

/**
 * タスクの表示アクションを作成する
 * @param tasks 表示するタスクのリスト
 */
export const createShowTasksAction = (tasks: ITask[]) => {
  return {
    // tasks, // 本来はこっち
    tasks,
    type: SHOW_TASKS,
  };
};

/**
 * 新しいタスクを作成するアクションを作成する
 * @param taskName 新しいタスクの名前
 * @param deadline 新しいタクスの期限
 */
export const createAddTaskAction = (taskName: string, deadline: Date) => {
  return {
    type: ADD_TASK,
    taskName,
    deadline,
  };
};

/**
 * タスクの完了状態を切り替える
 * @param taskId 完了状態を切り替える対象のタスクのID
 */
export const createToggleCompleteAction = (taskId: string) => {
  return {
    type: TOGGLE_COMPLETE_TASK,
    taskId,
  };
};

/**
 * タスクを削除するアクションを作成する
 * @param taskId 削除するタスクのID
 */
export const createDeleteTaskAction = (taskId: string) => {
  return {
    type: DELETE_TASK,
    taskId,
  };
};

/**
 * タスクロード開始のアクションを作成する
 */
export const createToggleShowSpinnerAction = () => {
  return {
    type: TOGGLE_SHOW_SPINNER,
  };
};

export type TaskActions = ReturnType<
  | typeof createShowTasksAction
  | typeof createAddTaskAction
  | typeof createToggleCompleteAction
  | typeof createDeleteTaskAction
  | typeof createToggleShowSpinnerAction
>;
