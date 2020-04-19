import React, {
  Dispatch,
  createContext,
  Props,
  useReducer,
  useEffect,
} from "react";
import reducer from "./reducers/TaskReducer";
import { IState, initialState } from "./IState";
import { ITask } from "./states/ITask";
import { loadTask, saveState } from "./utils/TaskFileIF";
import {
  createShowTasksAction,
  createToggleShowSpinnerAction,
} from "./actions/TaskActions";

type StoreWithAction = {
  state: IState;
  dispatch: Dispatch<any>;
};

export const Store = createContext<StoreWithAction>({
  state: initialState,
  dispatch: () => {},
});

const StoreProvider: React.FC<Props<{}>> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initailLoad = async () => {
      // データファイルの存在チェック
      loadTask().then((jsonData) => {
        // 読み込んだデータで値を表示する
        // 実際にはデータの内容をチェックする必要がある
        const tasks = jsonData.data as ITask[];
        dispatch(createShowTasksAction(tasks || []));
        dispatch(createToggleShowSpinnerAction());
      });
    };
    initailLoad();
  }, []);
  useEffect(() => {
    const saveTaskList = async () => {
      dispatch(createToggleShowSpinnerAction());
      await saveState(state.taskList.tasks);
      dispatch(createToggleShowSpinnerAction());
    };
    saveTaskList();
  }, [state.taskList.tasks]);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
};

export default StoreProvider;
