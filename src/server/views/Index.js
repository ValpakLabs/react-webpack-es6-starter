import React, {Component, PropTypes} from 'react';
import {renderToString} from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Index extends Component {
  render() {
    const {config, server, component, store} = this.props;
    const title = 'Valpak.com';
    const description = 'Valpak.com Homepage';
    return (
      <html lang='en-us'>
        <head>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1'/>
          <title>{config.app.name}</title>
          <meta name='description' content='Valpak.com Homepage'/>
          <base href={`${config.appContext}/`} />
          <link href='//fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'/>
          <link rel='shortcut icon' href={`${config.appContext}/favicon.png`} />
          {config.isProduction && <link rel='stylesheet' href={`${config.appContext}/dist/app.css`} />}
        </head>
        <body>
          <div id='content' dangerouslySetInnerHTML={{__html: renderToString(component)}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          <script dangerouslySetInnerHTML={{__html: `window.__initialLoad=true;`}} />
          <script src={`${config.appContext}/dist/bundle.js`}/>
        </body>
      </html>
    );
  }
}
