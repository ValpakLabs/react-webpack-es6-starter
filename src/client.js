import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider }     from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import ApiClient from './ApiClient';
import getRoutes from './routes';
import createStore from './redux/createStore';
import dimensions from './utils/dimensions';

const client = new ApiClient(window.__data.config);
const store = createStore(client, window.__data);

store.initialLoad = true;

const component = (
  <Provider store={store}>
    <Router children={getRoutes(store)} history={createBrowserHistory()}/>
  </Provider>
);

ReactDOM.render(component, document.getElementById('content'));

store.initialLoad = false;

window.React = React; // enable debugger
dimensions(window, document);
