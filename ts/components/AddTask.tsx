import "react-datepicker/dist/react-datepicker.css"; // (1)

import Moment from "moment";
import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import Styled from "styled-components";
import { v4 as UUID } from "uuid";

import { createAddTaskAction } from "../actions/TaskActions";
import { Store } from "../Store";
import { $COLOR_SECONDARY_1_3 } from "./FoundationStyles";

/**
 * コンポーネント プロパティ
 *
 * ここでは、初期値として扱う
 */
interface IProps {
  /** タスク名 */
  taskName: string;
  /** 期限 */
  deadline: Date;
}

interface ILocalState {
  /** タスク名 */
  taskName: string;
  /** 期限 */
  deadline: Date;
}

//#region styled
const Container = Styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    margin: 1em 0;
    width: 100%;
`;

const TextBox = Styled.input`
    box-sizing: border-box;
    width: 100%;
`;

const TaskNameBox = Styled.p`
    flex-grow: 1;
`;

const DeadlineBox = Styled.div`
`;

const AddButton = Styled.button`
    background-color: ${$COLOR_SECONDARY_1_3};
    border-radius: 50%;
    color: white;
    display: block;
    font-size: 150%;
    height: 40px;
    padding: 0;
    width: 40px;
`;

//#endregion

export const AddTask = (props: IProps) => {
  const [localState, setLocalState] = useState<ILocalState>({
    deadline: props.deadline,
    taskName: props.taskName,
  });
  const { dispatch } = useContext(Store);

  /**
   * 追加ボタンを押すと、タスク一覧にタスクを追加する
   */
  const onClickAdd = () => {
    dispatch(createAddTaskAction(localState.taskName, localState.deadline));
    const m = Moment(new Date()).add(1, "days");
    setLocalState({
      deadline: m.toDate(),
      taskName: "",
    });
  };

  /**
   * タスク名変更イベントハンドラ
   *
   * テキストボックスの内容をローカルステートに反映する
   */
  const onChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalState({ ...localState, taskName: e.target.value });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onClickAdd();
    }
  };

  /**
   * 期日を変更したときのイベントハンドラ
   *
   * 変更した日付をローカルステートに反映する
   * DatePickerの独自プロパティで、引数として日付が渡される
   */
  const onChangeDeadLine = (date: Moment.Moment | null) => {
    setLocalState({
      ...localState,
      deadline: !!date ? date.toDate() : new Date(),
    });
  };

  const date = Moment(localState.deadline);
  const taskNameId = UUID();
  const deadlineId = UUID();
  return (
    <Container>
      <TaskNameBox>
        <label htmlFor={taskNameId}>task name</label>
        <TextBox
          id={taskNameId}
          type="text"
          value={localState.taskName}
          onChange={onChangeTaskName}
          onKeyDown={onKeyDown}
        />
      </TaskNameBox>
      <DeadlineBox>
        <label htmlFor={deadlineId}>dead line</label>
        <DatePicker
          selected={date}
          showTimeSelect={true}
          dateFormat="YYYY-MM-DD HH:mm"
          onChange={onChangeDeadLine}
        />
      </DeadlineBox>
      <AddButton onClick={onClickAdd}>+</AddButton>
    </Container>
  );
};
