import { globalStyle, style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const root = style({
  colorScheme: 'light dark',
  height: '100vh',
  overflow: 'auto',
  fontFamily: "'Roboto', sans-serif",
  fontSize: '14px',
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
  marginBottom: '70px',
  borderRadius: '30px',
});
globalStyle(`${root} .Toastify__toast`, {
  borderRadius: '30px',
  backgroundColor: color('success'),
  color: color('font'),
});
globalStyle(`${root} .Toastify__toast--error`, {
  borderRadius: '30px',
  backgroundColor: color('danger'),
});
globalStyle(`${root} .Toastify__toast-body`, {
  color: color('font'),
  padding: '0 15px',
});
globalStyle(`${root} .Toastify__toast-icon`, {
  display: 'none',
});
