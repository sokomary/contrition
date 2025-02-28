import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const name = style({
  marginLeft: '-8px',

  backgroundColor: color('background'),
  outline: 'none',
  border: 'none',
  resize: 'none',
  fontSize: '16px',
  fontFamily:
    // eslint-disable-next-line max-len
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n  sans-serif",
  padding: '6px',
  maxWidth: '180px',

  selectors: {
    '&:focus': {
      backgroundColor: color('field'),
      borderRadius: '6px',
    },
  },
  '@media': {
    [MEDIA.ipadv]: {
      maxWidth: '300px',
    },
  },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  fontSize: '16px',
});

export const actions = style({
  padding: 0,
  height: 31,
  justifyContent: 'flex-start',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});
