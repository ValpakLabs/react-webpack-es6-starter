import expect from 'expect';
import detectDevice from '../detectDevice';

detectDevice.__Rewire__('device', (ua) => ({type: 'mobile'}));

describe.only('detect device', () => {
  it('should call next middleware when device exists', () => {
    const detect = detectDevice();
    const req = {
      session: {
        device: {type: 'mobile'}
      }
    };
    const res = {};
    const next = expect.createSpy();

    detect(req, res, next);

    expect(req.device).toEqual({type: 'mobile'});
    expect(_device).toNotHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should parse ua string and add to session', () => {
    const detect = detectDevice();
    const req = {
      headers: {
        'user-agent': 'whatever'
      },
      session: {}
    };
    const res = {};
    const next = expect.createSpy();

    detect(req, res, next);

    expect(req.session.device).toEqual({type: 'mobile'});
    expect(req.device).toEqual({type: 'mobile'});
    expect(next).toHaveBeenCalled();
  });
});
