import Moment from "moment";
import React, { useEffect, useContext } from "react";
import Styled from "styled-components";

import { createToggleShowSpinnerAction } from "../actions/TaskActions";
import { Store } from "../Store";
import { AddTask } from "./AddTask";
import {
  $COLOR_FOREGROUND_REVERSE,
  $COLOR_PRIMARY_3,
} from "./FoundationStyles";
import TaskRow from "./TaskRow";
import { Loading } from "./Loading";

//#region styled
const MainContainer = Styled.div`
    margin: 10px auto 0 auto;
    max-width: 600px;
    min-width: 300px;
    width: 80%;
`;

const Header = Styled.h1`
    background-color: ${$COLOR_PRIMARY_3};
    color: ${$COLOR_FOREGROUND_REVERSE};
    font-size: 160%;
    padding: 1em;
    text-align: center;
`;

const TaskListContainer = Styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
`;

//#endregion

const TaskList = () => {
  const { state, dispatch } = useContext(Store);
  const { tasks, shownLoading } = state.taskList;
  useEffect(() => {
    dispatch(createToggleShowSpinnerAction());
  }, []);

  const taskListElems = tasks
    .sort((a, b) => {
      return a.deadline < b.deadline
        ? -1
        : a.deadline.getTime() === b.deadline.getTime()
        ? 0
        : 1;
    })
    .map((it) => {
      return <TaskRow key={it.id} {...it} />;
    });

  return (
    <div>
      <Header>TODO</Header>
      <MainContainer>
        <AddTask taskName="" deadline={Moment().add(1, "days").toDate()} />
        <TaskListContainer>{taskListElems /* ...(b')*/}</TaskListContainer>
      </MainContainer>
      <Loading shown={shownLoading} />
      {/* <-追加 */}
    </div>
  );
};

export default TaskList;
