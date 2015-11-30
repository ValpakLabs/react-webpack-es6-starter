import device from 'device';

export default function() {
  return async (req, res, next) => {
    if (req.session && req.session.device) {
      req.device = req.session.device;
      next();
    } else {
      let userAgent = req.headers['user-agent'];
      if (!userAgent) next();
      const deviceObject = device(userAgent);
      if (req.session)
        req.session.device = deviceObject;
      req.device = deviceObject;
      next();
    }
  };
}
