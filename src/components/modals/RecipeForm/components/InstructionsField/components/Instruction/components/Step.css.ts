import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const container = style({
  display: 'flex',
  gap: '3px',
  borderRadius: '5px',
  padding: '5px 0',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const content = style({
  display: 'flex',
  gap: '1px',
  alignItems: 'flex-start',
});

export const number = style({
  marginTop: '6px',
  marginRight: '3px',
  fontSize: '16px',
});

export const textarea = style({
  backgroundColor: color('background'),
  outline: 'none',
  border: 'none',
  resize: 'none',
  fontSize: '16px',
  // eslint-disable-next-line max-len
  fontFamily:
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

export const actions = style({
  justifyContent: 'flex-start',
  padding: 0,
});
