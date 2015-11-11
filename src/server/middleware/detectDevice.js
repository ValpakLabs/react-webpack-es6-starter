export default function deviceDetect() {
  return async function (req, res, next) {
    try {
      if (req.session.device) {
      req.device = req.session.device;
      next();
      } else {
        let userAgent = req.headers['user-agent'];
        if (!userAgent) next();
        const deviceString = await getWURFLData(userAgent);
        const deviceObject = parseDeviceString(deviceString);
        req.session.device = req.device = deviceObject;
        next();
      }
    } catch(err) {
      next(err);
    }
  };
}

async function getWURFLData(userAgent) {
    const response = await fetch('http://wurfl.io/wurfl.js', {
      headers: {
        'user-agent': userAgent
      }
    });
    return await response.text();
}

function parseDeviceString(text) {
  let wurflDeviceFn = text
    .substr(text.indexOf('eval'))
    .replace(/^eval/, '');

  let deviceString = eval(wurflDeviceFn).replace('var WURFL=','');

  let wurflDevice = JSON.parse(
    deviceString
      .replace('var WURFL=','')
      .substr(0, deviceString.indexOf(';'))
  );

  return wurflDevice;
}
