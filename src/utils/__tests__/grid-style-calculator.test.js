import getGridStyles from '../grid-style-calculator';

const defaultStyles = {
  clear: 'both',
  float: 'none',
  display: 'inline',
  textAlign: 'inherit',
  paddingLeft: 0,
  paddingRight: 0,
  marginRight: 0,
  marginBottom: 0
};

describe('A Grid Style Calculator', function () {
  
  context('Given no arguments', function() {
    it('should return an object with default style values', function () {
      let styles = getGridStyles();
      expect(styles).to.deep.equal(defaultStyles);
    });   
  });


  context('Given an options argument object for each item in a sequence', function() {
    
    it('should add `float:right` to the last item in a row and `float:left` to all others', function () {
      let styles = [1,2,3,4,5,6].map((i, key) => {
        return getGridStyles({
          itemIndex: key,
          itemCount: 3,
          columns: 3
        });
      });
      expect(styles[0].float).to.equal('left');
      expect(styles[1].float).to.equal('left');
      expect(styles[2].float).to.equal('right');
      expect(styles[3].float).to.equal('left');
      expect(styles[4].float).to.equal('left');
      expect(styles[5].float).to.equal('right');
    });

    it('should add `clear:none` to each item when there is more than 1 column', function () {
      let styles = [1,2].map((i, key) => {
        return getGridStyles({
          itemIndex: key,
          itemCount: 2,
          columns: 2
        });
      });
      expect(styles[0].clear).to.equal('none');
      expect(styles[1].clear).to.equal('none');
    });

    it('should calculate the width % value for each item', function () {
      let styles = [1,2,3,4].map((i, key) => {
        return getGridStyles({
          itemIndex: key,
          itemCount: 4,
          columns: 4
        });
      });
      expect(styles[0].width).to.equal('25%');
      expect(styles[1].width).to.equal('25%');
      expect(styles[2].width).to.equal('25%');
      expect(styles[3].width).to.equal('25%');
    });

    context('Given a non-zero gutter option', function() {
      it('should add a marginRight % value to each item excluding the last', function () {
        let styles = [1,2,3,4].map((i, key) => {
          return getGridStyles({
            itemIndex: key,
            itemCount: 4,
            columns: 4,
            gutter: 1/10
          });
        });
        expect(styles[0].marginRight).to.equal('2.5%');
        expect(styles[1].marginRight).to.equal('2.5%');
        expect(styles[2].marginRight).to.equal('2.5%');
        expect(styles[3].marginRight).to.equal(0);
      });
    });

    context('Given there is more than one row of items and a non-zero rowGutter option', function() {
      it('should add a marginBottom pixel value for each item in a row excluding the last row', function () {
        let styles = [1,2,3,4].map((i, key) => {
          return getGridStyles({
            itemIndex: key,
            itemCount: 4,
            columns: 2,
            rowGutter: 1/10
          });
        });
        expect(styles[0].marginBottom).to.equal('24px');
        expect(styles[1].marginBottom).to.equal('24px');
        expect(styles[2].marginBottom).to.equal(0);
        expect(styles[3].marginBottom).to.equal(0);
      });
    })

  });


});