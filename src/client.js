import 'isomorphic-fetch';
import config from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider }     from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import ApiClient from './ApiClient';
import getRoutes from './routes';
import createStore from './redux/createStore';
import dimensions from './utils/dimensions';

const client = new ApiClient('http://localhost:3000');
const store = createStore(client, window.__data);
client.store = store;

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
