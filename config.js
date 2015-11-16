module.exports = {
  local: {
    appContext: '',
    mongoHost: 'mongodb://mongodev-01.coxtarget.com/valpak',
    serverRendering: true,
    host: 'http://192.168.0.5:7780',
    isProduction: false,
    port: 7780,
    app: {
      name: 'Valpak.com (LOCAL)'
    }
  },
  development: {
    appContext: '',
    mongoHost: 'mongodb://mongodev-01.coxtarget.com/valpak',
    serverRendering: true,
    host: 'http://vpdev.valpak.com/r',
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
    isProduction: true,
    port: 7780,
    app: {
      name: 'Valpak.com'
    }
  }
}[process.env.NODE_ENV || 'development'];
