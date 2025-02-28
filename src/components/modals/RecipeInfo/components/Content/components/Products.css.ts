import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const content = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexShrink: 0,
  padding: '20px',
  borderRadius: '20px',
  background: color('background'),
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  flexDirection: 'column',
  gap: '5px',
});

export const product = style({
  display: 'flex',
  gap: '5px',
});

export const quantity = style({
  width: '30px',
  flexShrink: 0,
  textAlign: 'end',
  fontSize: '16px',
  height: '19px',
});

export const divider = style({
  color: color('label'),
});

export const name = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '16px',
});

export const title = style({
  fontWeight: '500',
  fontSize: '16px',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});
