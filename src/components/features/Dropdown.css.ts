import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { color, MEDIA, px } from 'src/theme';

export const container = style({
  display: 'flex',
  gap: 1,
  flexDirection: 'column',
  position: 'relative',
});

export const content = recipe({
  base: {
    width: '100%',
    height: px(42),
    padding: `${px(8)} ${px(16)}`,
    zIndex: 99,

    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: px(16),
    alignItems: 'center',
    background: color('background'),

    '@media': {
      [MEDIA.ipadh]: {
        height: px(34),
        padding: `${px(4)} ${px(8)}`,
      },
    },
  },
  variants: {
    open: {
      true: {
        borderRadius: `${px(10)} ${px(10)} 0 0`,
        boxShadow: 'none',
      },
      false: {
        borderRadius: px(10),
        boxShadow: `0 0 ${px(10)} ${px(5)} rgba(8, 8, 8, 0.07)`,
      },
    },
  },
});

export const input = style({
  width: '100%',
  outline: 'none',
  border: 'none',
  fontSize: px(16),
  padding: `0 ${px(8)}`,
  background: color('background'),
});

export const emptyState = style({
  color: color('label'),
  fontSize: px(14),
  textAlign: 'center',
  padding: px(18),
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
export const contentContainer = style({
  background: color('background'),
  width: '100%',
  borderRadius: px(10),
  display: 'flex',
  flexDirection: 'column',
  gap: px(5),
  position: 'absolute',
  zIndex: 98,
  padding: `${px(34)} ${px(8)} ${px(8)} ${px(8)}`,
  animationDuration: '0.3s',
  animationName: itemsappears,
  animationDirection: 'alternate',
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  maxHeight: px(250),
  overflowY: 'scroll',
  overflowX: 'hidden',

  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const options = style({
  maxHeight: px(140),
  overflowY: 'scroll',
});

export const label = style({
  display: 'flex',
});

export const option = recipe({
  base: {
    height: px(42),
    padding: px(8),
    cursor: 'pointer',
    fontSize: px(16),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: color('font'),
    textAlign: 'left',

    selectors: {
      '&:hover': {
        fontSize: px(17),
        backgroundColor: color('secondary'),
        borderRadius: px(7),
        color: color('primary'),
      },
    },

    '@media': {
      [MEDIA.ipadh]: {
        height: px(34),
      },
    },
  },
  variants: {
    selected: {
      true: {
        color: color('label'),
        selectors: {
          '&:hover': {
            fontSize: px(17),
          },
        },
      },
    },
  },
});

export const dot = style({
  height: px(7),
  width: px(7),
  borderRadius: px(3.5),
  backgroundColor: color('accent'),
  alignSelf: 'center',
  marginRight: px(4),
});
