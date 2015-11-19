module.exports = {
  development: {
    appContext: '',
    mongoHost: 'mongodb://mongodev-01.coxtarget.com/valpak',
    serverRendering: true,
    host: 'http://localhost:7780',
    balefireApiHost: 'http://vpdev1.valpak.com:7720/balefire/v1/valpak',
    collectionApiHost: 'http://localhost:7788',
    isProduction: false,
    port: 7780,
    app: {
      name: 'Valpak.com (DEV)'
    }
  },
  production: {
    appContext: '',
    mongoHost: 'mongodb://mongodb-01.coxtarget.com/valpak',
    serverRendering: true,
    host: 'http://www.valpak.com/r',
    balefireApiHost: 'http://vpdev1.valpak.com:7720/balefire/v1/valpak',
    collectionApiHost: 'http://vpdev1.valpak.com:7788',
    isProduction: true,
    port: 7780,
    app: {
      name: 'Valpak.com'
    }
  }
}[process.env.NODE_ENV || 'development'];
