import cover from '../cover-bounds';

describe('Module: cover-bounds', function () {
  
  context('Given any number of arguments of any type', function() {
    it('should return an object with top, left, width, and height keys', function () {
      expect(cover()).to.include.keys('top', 'left', 'width', 'height');
      expect(cover(4,5)).to.include.keys('top', 'left', 'width', 'height');
      expect(cover(1,'2',3)).to.include.keys('top', 'left', 'width', 'height');
      expect(cover(1,[2],3,4,5)).to.include.keys('top', 'left', 'width', 'height');
      expect(cover(1,2,'3',{x:4},{f:'5'},6)).to.include.keys('top', 'left', 'width', 'height');
    });
  });

  context('Given a h1:w1 ratio <= h2:w2 ratio', function() {
    it('should return a width constrained to w1 and `auto` height', function () {
      let bounds = cover(30, 10, 200, 100);
      expect(bounds.width).to.equal(30);
      expect(bounds.height).to.equal('auto');
    });

    it('should return an integer offset for vertically centering by default', function () {
      let bounds = cover(30, 10, 200, 100);
      expect(bounds.top).to.equal(-2);
      expect(bounds.left).to.equal(0);
    });
  });

  context('Given a h1:w1 ratio >= h2:w2 ratio', function() {
    it('should return a height constrained to h1 and `auto` width', function () {
      let bounds = cover(30, 25, 200, 100);
      expect(bounds.width).to.equal('auto');
      expect(bounds.height).to.equal(25);
    });

    it('should return an integer offset for horizontal centering by default', function () {
      let bounds = cover(30, 25, 200, 100);
      expect(bounds.top).to.equal(0);
      expect(bounds.left).to.equal(-10);
    });

    context('Given truthy value for 7th argument `fit`', function() {
      it('should return a width constrained to w1 and `auto` height', function () {
        let bounds = cover(30, 25, 200, 100, 'px', true, true);
        expect(bounds.width).to.equal('30px');
        expect(bounds.height).to.equal('auto');
      });
    })
  });

  context('Given a string value as a 5th argument', function() {
    it('should append the string to numeric return values', function () {
      let bounds = cover(30, 10, 200, 100, 'px');
      expect(bounds.top).to.equal('-2px');
      expect(bounds.left).to.equal('0px');
      expect(bounds.width).to.equal('30px');
      expect(bounds.height).to.equal('auto');
    });
  });

  context('Given a falsy value as a 6th argument', function() {
    it('should return 0 for top and left offsets', function () {
      let bounds = cover(30, 10, 200, 100, 0, false);
      expect(bounds.top).to.equal(0);
      expect(bounds.left).to.equal(0);

      bounds = cover(30, 25, 200, 100, 0, false);
      expect(bounds.top).to.equal(0);
      expect(bounds.left).to.equal(0);
    });
  });

}); 