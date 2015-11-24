'use strict';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';

require('isomorphic-fetch');
require('css-modules-require-hook')({
  extensions: ['.scss'],
  generateScopedName: function(exportedName, exportedPath) {
    var path = exportedPath.substr(1).replace(/\//g, '-').replace('.css', '');
    return path + '-' + exportedName;
  }
});
require('babel/register')({
  stage: 0,
  optional: ['es7.asyncFunctions', 'runtime']
});
require('./src/server/app')
  .start()
  .catch(function(error) {
    console.error('catch', error);
  });
