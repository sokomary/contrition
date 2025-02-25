import { keyframes, style } from '@vanilla-extract/css';
import { color } from 'src/theme';

const loginButton = keyframes({
  '0%': {
    marginLeft: '-3000px',
  },
  '100%': {
    marginLeft: 0,
  },
});

export const container = style({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color('background'),
});

export const loginButtonContent = style({
  alignItems: 'center',
  display: 'flex',
  gap: 11,
});

export const button = style({
  animationDuration: '1s',
  animationName: loginButton,
});
