import express from 'express';

export default function() {
  const router = express.Router();

  router.route('/')
    .post(async (req, res, next) => {
      try {
        const uri = 'https://apidev.valpak.com/pub/auto/validate/geo/';
        let response = await fetch(uri + req.body.geo);
        let {postalGeography} = await response.json();
        let dma = postalGeography.dma || {}
        let state = postalGeography.state || {}
        const geo = req.geo = req.session.geo = {
          city: postalGeography.city,
          dmaCode: dma.dmaCode,
          latitude: postalGeography.latX,
          longitude: postalGeography.longY,
          postalCode: postalGeography.postalCode,
          state: state.abbreviation,
          ...state.country
        };
        res.cookie('geo', geo)
        res.json(geo);
      } catch (err) {
        next(err);
      }
    });

  return router;
}
