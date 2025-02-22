import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { color, MEDIA } from 'src/theme';

export const container = style({
  display: 'flex',
  gap: 1,
  flexDirection: 'column',
  position: 'relative',
});

export const content = recipe({
  base: {
    width: '100%',
    height: '34px',
    zIndex: 99,
    padding: '4px 8px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    alignItems: 'center',
    background: color('background'),
    '@media': {
      [MEDIA.iphone]: {
        height: '42px',
        padding: '8px 16px',
      },
    },
  },
  variants: {
    open: {
      true: {
        borderRadius: '10px 10px 0 0',
        boxShadow: 'none',
      },
      false: {
        borderRadius: '10px',
        boxShadow: '0 0 10px 5px rgba(8, 8, 8, 0.07)',
      },
    },
  },
});

export const input = style({
  width: '100%',
  outline: 'none',
  border: 'none',
  fontSize: '16px',
  padding: '0 8px',
  background: color('background'),
});

export const emptyState = style({
  color: color('label'),
  fontSize: '14px',
  textAlign: 'center',
  padding: '18px',
});

const itemsappears = keyframes({
  '0%': {
    transform: 'scaleY(0)',
    transformOrigin: 'top center',
  },
  '100%': {
    transform: 'scaleY(1)',
    transformOrigin: 'top center',
  },
});
export const contentContainer = recipe({
  base: {
    background: color('background'),
    width: '100%',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    position: 'absolute',
    zIndex: 98,
    padding: '34px 8px 8px 8px',
    animationDuration: '0.3s',
    animationName: itemsappears,
    animationDirection: 'alternate',
  },
  variants: {
    open: {
      true: {
        boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
      },
      false: {
        boxShadow: 'none',
      },
    },
  },
});

export const options = style({
  maxHeight: '140px',
  overflowY: 'scroll',
});

export const label = style({
  display: 'flex',
});

export const option = recipe({
  base: {
    height: '34px',
    padding: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',

    selectors: {
      '&:hover': {
        fontSize: '17px',
        backgroundColor: color('secondary'),
        borderRadius: '7px',
        color: color('primary'),
      },
    },

    '@media': {
      [MEDIA.iphone]: {
        height: '42px',
      },
    },
  },
  variants: {
    selected: {
      true: {
        color: color('label'),
        selectors: {
          '&:hover': {
            fontSize: '17px',
          },
        },
      },
    },
  },
});

export const dot = style({
  height: '7px',
  width: '7px',
  borderRadius: '3.5px',
  backgroundColor: color('accent'),
  alignSelf: 'center',
  marginRight: '4px',
});
