
module.exports = {
  development: {
    appContext: '/r',
    mongoHost: 'mongodb://mongodev-01.coxtarget.com/valpak',
    serverRendering: true,
    isProduction: false,
    port: 7780,
    app: {
      name: 'Valpak.com (DEV)'
    }
  },
  production: {
    appContext: '/r',
    mongoHost: 'mongodb://mongodb-01.coxtarget.com/valpak',
    serverRendering: true,
    isProduction: true,
    port: 7780,
    app: {
      name: 'Valpak.com'
    }
  }
}[process.env.NODE_ENV || 'development'];
