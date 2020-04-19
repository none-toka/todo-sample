import Moment from "moment";
import React, { useContext } from "react";
import Styled from "styled-components";

import {
  createDeleteTaskAction,
  createToggleCompleteAction,
} from "../actions/TaskActions";
import { ITask } from "../states/ITask";
import { Store } from "../Store";
import { $COLOR_SECONDARY_1_3, $COLOR_SECONDARY_2_0 } from "./FoundationStyles";

//#region styled
/**
 * 行の大外枠...(1)
 */
const Task = Styled.div<{ expiration: boolean }>`
    align-items: center;
    background-color: ${(p) =>
      p.expiration ? "inherit" : $COLOR_SECONDARY_2_0};
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid rgb(200,200,200);
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
    padding: 10px;
    transition-duration: .2s;
    transition-property: all;
    /* (2) */
    &:hover {
        transform: translate(-5px, -5px);
        box-shadow: 5px 5px 5px rgba(200,200,200,4);
    }
`;
/**
 * タスク完了のチェックアイコン表示 枠
 */
const TaskCheckBox = Styled.div`
    align-items: center;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    flex-grow: 0;
    flex-shrink: 0;
    height: 2em;
    width: 2em;
`;
/**
 * タスク完了チェックアイコン
 */
const TaskCheck = Styled.p`
    color: ${$COLOR_SECONDARY_1_3};
    font-size: 150%;
`;
/**
 * タスク名と期日の表示 枠
 */
const TaskBody = Styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    height: 3em;
    justify-content: space-around;
`;
/**
 * タスク削除アイコン
 */
const TaskRemove = Styled.div`
    flex-grow: 0;
    flex-shrink: 0;
`;
/**
 * タスク名
 */
const TaskName = Styled.div`
    font-size: 120%;
`;

/**
 * 期日
 */
const Deadline = Styled.div`
`;

//#endregion

const TaskRow = (props: ITask) => {
  const { dispatch } = useContext(Store);
  const { deadline, complete, taskName, id } = props;

  const deadlineString = Moment(deadline).format("YYYY-MM-DD hh:mm");

  const onClickBox = () => {
    dispatch(createToggleCompleteAction(id));
  };
  const onClickDelete = (e: React.MouseEvent) => {
    dispatch(createDeleteTaskAction(id));
    // クリックイベントを親要素の伝播させない
    e.stopPropagation();
  };

  return (
    <Task expiration={new Date() < deadline || complete} onClick={onClickBox}>
      <TaskCheckBox>
        <TaskCheck>{complete ? "✔" : null}</TaskCheck>
      </TaskCheckBox>
      <TaskBody>
        <TaskName>{taskName}</TaskName>
        <Deadline>⏰{deadlineString}</Deadline>
      </TaskBody>
      <TaskRemove onClick={onClickDelete}>❌</TaskRemove>
    </Task>
  );
};

export default TaskRow;
