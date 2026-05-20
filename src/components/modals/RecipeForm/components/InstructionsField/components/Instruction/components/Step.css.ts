import { style } from '@vanilla-extract/css';
import { color, MEDIA, px } from 'src/theme';

export const container = style({
  display: 'flex',
  gap: px(3),
  borderRadius: px(5),
  padding: `${px(5)} 0`,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const content = style({
  display: 'flex',
  gap: px(1),
  alignItems: 'flex-start',
});

export const number = style({
  marginTop: px(6),
  marginRight: px(3),
  fontSize: px(16),
});

export const textarea = style({
  backgroundColor: color('background'),
  outline: 'none',
  border: 'none',
  resize: 'none',
  fontSize: px(16),
  // eslint-disable-next-line max-len
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n  sans-serif",
  padding: px(6),
  maxWidth: px(180),
  selectors: {
    '&:focus': {
      backgroundColor: color('field'),
      borderRadius: px(6),
    },
  },
  '@media': {
    [MEDIA.ipadv]: {
      maxWidth: px(300),
    },
  },
});
