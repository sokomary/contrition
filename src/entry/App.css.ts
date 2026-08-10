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

globalStyle(`${root} :where(h1, h2, h3, h4, h5, h6)`, {
  margin: 0,
  fontSize: 'inherit',
  fontWeight: 'inherit',
});
globalStyle(`${root} :where(ul, ol)`, {
  margin: 0,
  padding: 0,
  listStyle: 'none',
});
globalStyle(`${root} :where(p, figure, dl, dd)`, {
  margin: 0,
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
