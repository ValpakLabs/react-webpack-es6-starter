import network from 'network';

export default function() {
  return async (req, res, next) => {
    const uri = 'https://api.valpak.com/pub/geo/iplocations/';
    if (req.cookies && req.cookies.geo) {
      req.geo = req.cookies.geo;
      next();
    } else {
      network.get_public_ip(async (err, ip) => {
        try {
          let response = await fetch(uri + ip);
          let geo = await response.json();
          res.cookie('geo', geo);
          req.geo = geo;
          next();
        } catch (e) {
          next(e);
        }
      });
    }
  };
}
