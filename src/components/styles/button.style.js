import Color from 'color';
import colors from '../../theme/colors';

function getButtonStyles(props) {

  const {weight, size, fab, color, push, shadow, children, fill, flex, disabled, width, height, display, justify} = props;

  const _width = width ? width : fab ? size === 'tiny' ? 40 : 60 : 'auto';
  const _height = height ? height : fab ? size === 'tiny' ? 40 : 60 : size === 'tiny' ? 18 : 40;

  let base = {
    display: display,
    fontFamily: 'inherit',
    transform: 'translateY(0)',
    transition: 'all .1s ease-out',
    height: _height,
    width: display === 'block' ? '100%' : _width,
    position: 'relative',
    borderRadius: fab || !children ? '50%' : 2,
    background: fill,
    fontSize: size === 'tiny' ? 11 : 14,
    color: color,
    padding: size === 'tiny' ? 0 : `${children ? '0px 12px' : '0px 8px'}`,
    flex: flex,
    margin: push,
    cursor: 'pointer',
    boxShadow: !fab || !shadow ? 'none' : '0 3px 6px rgba(0,0,0,0.5)',
    opacity: disabled ? 0.4 : 1,
    border: props.outline ? `1px solid ${colrs.grey300}` : 0
  };

  let inner = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: justify
  };

  let icon = {
    margin: 0,
    lineHeight: 0
  };

  let text = {
    margin: size === 'tiny' ? '0 0 0 3px' : '0 8px',
    fontWeight: weight || 500,
    lineHeight: '24px'
  };

  let modifiers = {
    hover: {
      background: fill !== 'transparent' ?
        Color(fill).darken(0.15).rgbaString() :
        !disabled && size !== 'tiny' && children ? Color(color).clearer(0.9).rgbaString() : 'transparent'
    },
    focus: {
      outline: 'none'
    },
    active: {

    }
  };

  return {
    base,
    inner,
    icon,
    text,
    modifiers
  };
}

export default getButtonStyles;
