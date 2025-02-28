import { style } from '@vanilla-extract/css';

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

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});
