import config from '../../../config';
import winston from 'winston';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import ApiClient from '../../ApiClient';
import getRoutes, { prefetchData } from '../../routes';
import { AppError, NotFoundError } from '../utils/errors';
import Index from '../views/Index';
import { Provider }     from 'react-redux';
import createStore from '../../redux/createStore';

const logger = winston.loggers.get('react-ssr');
logger.transports.console.level = 'verbose';

export default function(app) {
  return async (req, res, next) => {
    try {
      const client = new ApiClient(config);
      const store = createStore(client, {
        user: {
          device: {
            type: req.device.type,
            model: req.device.model
          },
          geo: req.geo
        },
        config
      });

      if (config.serverRendering) {
        match({ routes: getRoutes(store), location: req.url }, async (error, redirectLocation, renderProps) => {
          if (error) {
            logger.error(error);
            res.send(500, error.message);
          } else if (redirectLocation) {
            logger.info('router returned redirect', redirectLocation);
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
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

              let response = renderComponent(component, store);

              logger.silly('rendered', response);

              res.send(response);
            } catch (error) {
              logger.error(error);
              next(error);
            }
          } else {
            next(new NotFoundError());
          }
        });
      } else {
        res.send(renderComponent(<div />, store));
      }
    } catch (error) {
      next(error);
    }
  };
}

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
