import { style } from '@vanilla-extract/css';

export const field = style({
  width: '66%',
});

export const fields = style({
  width: '100%',
  display: 'flex',
  paddingTop: '3px',
  justifyContent: 'space-between',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
});
