import config from '../../../config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import getRoutes from '../../routes';
import {AppError, NotFoundError} from '../utils/errors';
import Index from '../views/Index';
import { Provider }     from 'react-redux';
import createStore from '../../redux/createStore';

export default async (req, res, next) => {
  try {
    const store = createStore({user: {device: req.device}});

    if (config.serverRendering) {
      match({ routes: getRoutes(), location: req.url }, async (error, redirectLocation, renderProps) => {
        if (error) {
          res.send(500, error.message)
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          try {
            await* prefetchData(
              renderProps.components,
              store.getState,
              store.dispatch,
              renderProps.location,
              renderProps.params
            );

            let component = (
              <Provider store={store}>
                <RoutingContext {...renderProps} />
              </Provider>
            );

            res.send(renderComponent(component, store));
          } catch (error) {
            console.log('error!')
            next(error);
          }
        } else {
          next(new NotFoundError())
        }
      });
    } else {
      res.send(renderComponent(<div />, store));
    }
  } catch (error) {
    console.log('shit', error);
    next(error);
  }
};

function renderComponent(component, store) {
  return `<!doctype html>
    ${renderToString(
      <Index
        server=''
        config={config}
        component={component}
        store={store} />
    )}
  `;
}

function prefetchData(components, getState, dispatch, location, params) {
  return components
    .filter((component) => getFetchData(component))
    .map(getFetchData)
    .map(fetchData => fetchData(getState, dispatch, location, params));
};

function getFetchData(component = {}) {
  return component.WrappedComponent ?
    getFetchData(component.WrappedComponent) :
    component.fetchData;
};
