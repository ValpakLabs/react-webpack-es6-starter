export default {

  getFlyoutStyles(props, targetBounds) {
    let {
      width,
      triangleWidth,
      triangleHeight,
      offset,
      position
    } = props;

    let triTop = 'auto';
    let triLeft = 'auto';
    let triBottom = 'auto';
    let triRight = 'auto';

    let flyoutTransformOriginX = 0;
    let flyoutTransformOriginY = 0;

    let flyoutBounds = getFlyoutBounds(position, targetBounds, width, triangleWidth + offset, props.halign);

    if (position === 'above' || position === 'below') {
        if (props.halign === 'right') {
          triLeft = props.width - (triangleWidth * 2) - 12
        } else {
          triLeft = Math.floor(Math.abs(flyoutBounds.left - targetBounds.left) + (targetBounds.width/2) - (triangleWidth));
        }
    }

    if (position === 'above') {
      triBottom = -triangleHeight;
      flyoutTransformOriginX = `${triLeft}px`;
      flyoutTransformOriginY = 'bottom';
    }

    if (position === 'below') {
      triTop = -triangleHeight;
      flyoutTransformOriginX = `${triLeft}px`;
    }

    if (position === 'right' || position === 'left')
      triTop = targetBounds.height/2 - triangleHeight;

    if (position === 'right')
      triLeft = -triangleWidth;

    if (position === 'left') {
      triRight = -triangleWidth;
      flyoutTransformOriginX = '100%';
    }

    return {
      flyoutPosition: {
        position: 'fixed',
        top: flyoutBounds.top,
        right: flyoutBounds.right,
        bottom: flyoutBounds.bottom,
        left: flyoutBounds.left,
        transformOrigin: `${flyoutTransformOriginX} ${flyoutTransformOriginY}`
      },

      trianglePosition: {
        top: triTop,
        bottom: triBottom,
        left: triLeft,
        right: triRight,
        width: triangleWidth,
        height: triangleHeight,
        borderWidth: triangleWidth
      }
    };
  }

}



// helper
function getFlyoutBounds(_position, targetBounds, width, _offset, halign) {

  let screenWidth = document.body.clientWidth;
  let screenHeight = document.body.clientHeight;

  let flyoutBoundaries = {
    above: {},
    right: {},
    below: {},
    left: {}
  };

  flyoutBoundaries.above.top = 'auto';
  flyoutBoundaries.above.bottom = Math.abs(targetBounds.bottom - screenHeight) + targetBounds.height + _offset;
  flyoutBoundaries.above.right = 'auto';
  flyoutBoundaries.above.left = targetBounds.left - (width/2) + (targetBounds.width/2);

  flyoutBoundaries.below.top = targetBounds.top + targetBounds.height + _offset;
  flyoutBoundaries.below.bottom = 'auto';
  flyoutBoundaries.below.right = 'auto';
  flyoutBoundaries.below.left = flyoutBoundaries.above.left;

  flyoutBoundaries.right.top = targetBounds.top;
  flyoutBoundaries.right.bottom = 'auto';
  flyoutBoundaries.right.right = 'auto';
  flyoutBoundaries.right.left = targetBounds.left + targetBounds.width + _offset;

  flyoutBoundaries.left.top = flyoutBoundaries.right.top;
  flyoutBoundaries.left.bottom = 'auto';
  flyoutBoundaries.left.right = 'auto';
  flyoutBoundaries.left.left = targetBounds.left - width - _offset;


  if (_position === 'below' || _position === 'above') {
    if (flyoutBoundaries.above.left + width > screenWidth || halign === 'right')
      flyoutBoundaries[_position].left = (screenWidth - width) - (screenWidth - targetBounds.right);
    if (flyoutBoundaries.above.left < 0)
      flyoutBoundaries[_position].left = targetBounds.left;
  }

  if (_position === 'right') {
    if (flyoutBoundaries.right.left + width > screenWidth)
      return getFlyoutBounds('left');
  }

  if (_position === 'left') {
    if (flyoutBoundaries.left.left < 0)
      return getFlyoutBounds('right');
  }

  return flyoutBoundaries[_position];
}
