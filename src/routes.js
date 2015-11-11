import React from 'react';
import {Route, IndexRoute} from 'react-router';
import config  from '../config';
import Main from './components/Main';
import WelcomePage from './components/WelcomePage';

const {appContext} = config;

function getRoutes() {
  return (
    <Route component={Main} path={`${appContext}/`}>
      <IndexRoute component={WelcomePage}/>
    </Route>
  );
}

export default getRoutes;
