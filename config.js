module.exports = {
  development: {
    appContext: '',
    mongoHost: 'mongodb://mongodev-01.coxtarget.com/valpak',
    serverRendering: true,
    host: process.env.HOSTNAME || 'localhost',
    balefireApiHost: 'http://vpdev1.valpak.com:7720/balefire/v1/valpak',
    collectionApiHost: 'http://vpdev1.valpak.com:7788',
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
    host: process.env.HOSTNAME || 'localhost',
    balefireApiHost: 'http://vpdev1.valpak.com:7720/balefire/v1/valpak',
    collectionApiHost: 'http://vpdev1.valpak.com:7788',
    isProduction: true,
    port: 7780,
    app: {
      name: 'Valpak.com'
    }
  }
}[process.env.NODE_ENV || 'development'];
