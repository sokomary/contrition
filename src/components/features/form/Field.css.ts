import { color, MEDIA } from 'src/theme';
import { style } from '@vanilla-extract/css';

export const input = style({
  outline: 'none',
  borderRadius: '7px',
  border: 'none',
  fontSize: '16px',
  backgroundColor: color('field'),
  height: '42px',
  padding: '5px 10px',

  selectors: {
    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
    },
  },

  '@media': {
    [MEDIA.ipadv]: {
      height: '34px',
    },
  },
});

export const label = style({
  fontSize: '16px',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});
