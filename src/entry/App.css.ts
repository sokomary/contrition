import { globalStyle, style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const root = style({
  colorScheme: 'light dark',
  height: '100dvh',
  overflow: 'auto',
  fontFamily: "'Roboto', sans-serif",
  fontSize: px(14),
  backgroundColor: color('background'),
  color: color('font'),
});

globalStyle('body', {
  backgroundColor: 'rgb(255, 255, 255, 1)',

  '@media': {
    'screen and (prefers-color-scheme: dark)': {
      backgroundColor: 'rgb(22, 24, 28, 1)',
    },
  },
});

globalStyle(`${root} .Toastify__toast-container`, {
  marginBottom: px(70),
  borderRadius: px(30),
});
globalStyle(`${root} .Toastify__toast`, {
  borderRadius: px(30),
  backgroundColor: color('success'),
  color: color('font'),
});
globalStyle(`${root} .Toastify__toast--error`, {
  borderRadius: px(30),
  backgroundColor: color('danger'),
});
globalStyle(`${root} .Toastify__toast-body`, {
  color: color('font'),
  padding: `0 ${px(15)}`,
});
globalStyle(`${root} .Toastify__toast-icon`, {
  display: 'none',
});
