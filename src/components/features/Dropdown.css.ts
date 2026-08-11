import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { color, MEDIA, px } from 'src/theme';

export const trigger = style({
  width: '100%',
  height: px(42),
  padding: `${px(8)} ${px(16)}`,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: px(16),
  alignItems: 'center',
  background: color('background'),
  color: color('font'),
  borderRadius: px(10),
  boxShadow: `0 0 ${px(10)} ${px(5)} rgba(8, 8, 8, 0.07)`,

  '@media': {
    [MEDIA.ipadh]: {
      height: px(34),
      padding: `${px(4)} ${px(8)}`,
    },
  },
});

export const search = style({
  display: 'flex',
  alignItems: 'center',
  gap: px(8),
  height: px(42),
  padding: `${px(8)} ${px(8)}`,
  boxSizing: 'border-box',

  '@media': {
    [MEDIA.ipadh]: {
      height: px(34),
      padding: `${px(4)} ${px(8)}`,
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
  color: color('font'),
});

export const emptyState = style({
  color: color('label'),
  fontSize: px(14),
  textAlign: 'center',
  padding: px(18),
});

export const contentContainer = style({
  background: color('background'),
  boxSizing: 'border-box',
  width: '100%',
  minWidth: px(170),
  borderRadius: px(10),
  display: 'flex',
  flexDirection: 'column',
  gap: px(5),
  padding: px(8),
});

export const options = style({
  maxHeight: px(140),
  overflowY: 'auto',
  overflowX: 'hidden',

  '::-webkit-scrollbar': {
    display: 'none',
  },
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
    justifyContent: 'left',

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
  borderRadius: '50%',
  background: color('primary'),
  alignSelf: 'center',
  marginInlineEnd: px(4),
  flexShrink: 0,
});
