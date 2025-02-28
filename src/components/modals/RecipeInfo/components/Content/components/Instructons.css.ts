import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const content = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexShrink: 0,
  gap: '10px',
  padding: '20px',
  borderRadius: '20px',
  background: color('background'),
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  flexDirection: 'column',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const steps = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const name = style({
  color: color('accent'),
  fontSize: '17px',
});

export const title = style({
  fontWeight: '500',
  fontSize: '16px',
});

export const step = style({
  fontSize: '16px',
});
