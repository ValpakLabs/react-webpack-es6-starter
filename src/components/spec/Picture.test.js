import Picture from '../Picture';

describe('A Picture component', function() {

  const imageProps = {
    handheld: {
      src: "http://host.com/img/image.jpg",
      width: 100,
      height: 50
    },
    tablet: {
      src: "http://host.com/img/image-tablet.jpg",
      width: 200,
      height: 150
    },
    desktop: {
      src: "http://host.com/img/image-desktop.jpg",
      width: 300,
      height: 250
    }
  };

  it('should have default props', function () {
    let picture = TestUtils.renderIntoDocument(<Picture />);
    let defaultImageAttrs = {src: null, width: 'auto', height: 'auto'};
    expect(picture.props.screen).to.equal('handheld');
    expect(picture.props.handheld).to.deep.equal(defaultImageAttrs);
    expect(picture.props.tablet).to.deep.equal(defaultImageAttrs);
    expect(picture.props.desktop).to.deep.equal(defaultImageAttrs);
  });  

  context('Given a screen prop and images prop object', function() {
    it('should render handheld with the correct src, width, and height', function () {
      let {containerNode, imageNode} = renderImageComponent('handheld', imageProps);
      expect(containerNode.style.width).to.equal('100px');
      expect(containerNode.style.height).to.equal('50px');
      expect(imageNode.src).to.equal('http://host.com/img/image.jpg');
    });

    it('should render tablet with the correct src, width, and height', function () {
      let {containerNode, imageNode} = renderImageComponent('tablet', imageProps);
      expect(containerNode.style.width).to.equal('200px');
      expect(containerNode.style.height).to.equal('150px');
      expect(imageNode.src).to.equal('http://host.com/img/image-tablet.jpg');
    });

    it('should render desktop with the correct src, width, and height', function () {
      let {containerNode, imageNode} = renderImageComponent('desktop', imageProps);
      expect(containerNode.style.width).to.equal('300px');
      expect(containerNode.style.height).to.equal('250px');
      expect(imageNode.src).to.equal('http://host.com/img/image-desktop.jpg');
    });
  });  

})

function renderImageComponent(screen, imgProps) {
  let pictureComponent = TestUtils.renderIntoDocument(
    <Picture 
      screen={screen} 
      handheld={imgProps.handheld}
      tablet={imgProps.tablet}
      desktop={imgProps.desktop}
    />
  );
  let containerNode = React.findDOMNode(pictureComponent);
  let imageNode = containerNode.querySelector('img');
  return {pictureComponent, containerNode, imageNode};
}