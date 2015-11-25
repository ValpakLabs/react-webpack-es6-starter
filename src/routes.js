import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Main from './components/Main';
import BalefirePage from './components/BalefirePage';
import CollectionPage from './components/CollectionPage';

function getRoutes(store) {
  const onEnter = createEnterFn(store);
  const appContext = store.getState().config.get('appContext');
  return (
    <Route component={Main} path={`${appContext}/`} onEnter={onEnterMain(store)}>
      <IndexRoute component={BalefirePage} onEnter={onEnter}/>
      <Route path='r/collections/:collectionId' component={CollectionPage} onEnter={onEnter}/>
      <Route path='r/*' component={BalefirePage} onEnter={onEnter}/>
    </Route>
  );
}

function onEnterMain(store) {
  return async (nextState, replaceState, callback) => {
    callback();
  };
}

/**
  The returned function should only be called on the client.
  It should not be called during initial page load as data
  will initially be hydrated from the server.
*/
function createEnterFn(store) {
  const {getState, dispatch} = store;
  return async (nextState, replaceState, callback) => {
    if (store.initialLoad || __SERVER__)
      return callback();
    let components = nextState.routes.map(route => route.component);
    try {
      await* prefetchData(components, getState, dispatch, nextState.location, nextState.params);
      callback();
    } catch (e) {
      console.error('client prefetch error');
      callback(e);
    }
  };
}

/**
  Recurse through HOC or base component and return
  its static `fetchData` method if it exists.
*/
function getFetchData(component = {}) {
  return component.WrappedComponent ?
    getFetchData(component.WrappedComponent) :
    component.fetchData;
};

/**
  Loop over all route components for current route and execute
  each component's static `fetchData` method. Returns an array
  of Promises.
*/
export function prefetchData(components, getState, dispatch, location, params) {
  return components
    .filter(getFetchData)
    .map(getFetchData)
    .map(fetchData => fetchData(getState, dispatch, location, params));
};

export default getRoutes;
