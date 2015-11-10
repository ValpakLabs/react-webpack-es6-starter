var path = require('path');
var Webpack = require('webpack');
var appConfig = require('./config');

var relativeAssetsPath = './static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

var config = {
  devtool: 'eval',
  context: path.resolve(__dirname),

  entry: [
    'webpack-hot-middleware/client',
    './src/client.js',
  ],

  output: {
    path: assetsPath,
    filename: 'bundle.js',
    publicPath: appConfig.appContext + '/dist/',
  },

  module: {
    loaders: [
      {test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'},
      {test: /\.js$/, include: path.resolve(__dirname, './src'), loader: 'babel'}
    ]
  },

  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin(),
    new Webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false
    })
  ]
}

module.exports = config;
