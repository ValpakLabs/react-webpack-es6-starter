import 'isomorphic-fetch';
import config from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider }     from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import getRoutes from './routes';
import createStore from './redux/createStore';
import dimensions from './utils/dimensions';

const store = createStore(window.__data);

const component = (
  <Provider store={store}>
    <Router children={getRoutes(store)} history={createBrowserHistory()} />
  </Provider>
);

ReactDOM.render(component, document.getElementById('content'));

window.React = React; // enable debugger
dimensions(window, document);
