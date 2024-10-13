import { globalStyle, style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const root = style({
  colorScheme: 'light dark',
  height: '100vh',
  overflow: 'auto',
  fontFamily: '\'Roboto\', sans-serif',
  fontSize: '14px',
  backgroundColor: color('background'),
  color: color('font'),
});

globalStyle(`${root} .Toastify__toast-container`, {
  marginBottom: '70px',
});
globalStyle(`${root} .Toastify__toast`, {
  borderRadius: '30px',
  backgroundColor: color('success'),
});
globalStyle(`${root} .Toastify__toast--error`, {
  borderRadius: '30px',
  backgroundColor: color('danger'),
});
globalStyle(`${root} .Toastify__toast-body`, {
  color: 'white',
  padding: '0 15px',
});
globalStyle(`${root} .Toastify__close-button`, {
  marginRight: '15px',
  marginTop: '15px',
});
