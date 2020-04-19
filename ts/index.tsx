import React from "react";
import ReactDom from "react-dom";
import TaskList from "./components/TaskList";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/FoundationStyles";
import StoreProvider from "./Store";

const container = document.getElementById("contents");

ReactDom.render(
  <div>
    <StoreProvider>
      <TaskList />
    </StoreProvider>
    <ThemeProvider theme={{}}>
      <GlobalStyle theme="" />
    </ThemeProvider>
  </div>,
  container
);
