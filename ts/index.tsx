import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import TaskList from './components/TaskList';
import Store from './Store';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components/FoundationStyles';

const container = document.getElementById('contents');

ReactDom.render(
    <div>
        <Provider store={Store}>
            <TaskList />
        </Provider>
        <ThemeProvider theme={{}}>
            <GlobalStyle theme="" />
        </ThemeProvider>
    </div>,
    container,
);
