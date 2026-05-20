import { color, MEDIA, px } from 'src/theme';
import { style } from '@vanilla-extract/css';

export const input = style({
  outline: 'none',
  borderRadius: px(7),
  border: 'none',
  fontSize: px(16),
  backgroundColor: color('field'),
  height: px(42),
  padding: `${px(5)} ${px(10)}`,

  selectors: {
    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
    },
  },

  '@media': {
    [MEDIA.ipadv]: {
      height: px(34),
    },
  },
});

export const label = style({
  fontSize: px(16),
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(5),
});
