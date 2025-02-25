import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const container = style({
  position: 'relative',
});

export const dot = style({
  height: '4px',
  width: '4px',
  borderRadius: '2px',
  flexShrink: 0,
  backgroundColor: color('primary'),
});

export const dots = style({
  display: 'flex',
  gap: 2,
  flexDirection: 'column',
});

export const actions = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  borderRadius: '5px',
  backgroundColor: color('background'),
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  padding: '8px',
  gap: '12px',
  right: '10px',
  top: '-50px',
  width: '135px',
});
