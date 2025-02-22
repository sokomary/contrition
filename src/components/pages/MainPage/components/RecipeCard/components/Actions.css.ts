import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

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
  cursor: 'pointer',
  alignSelf: 'flex-start',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2px',
  borderRadius: '5px',
});

export const options = style({
  display: 'flex',
  position: 'absolute',
  borderRadius: '5px',
  backgroundColor: color('background'),
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  padding: '8px',
  flexDirection: 'column',
  gap: '12px',
  right: '10px',
  top: '-50px',
});

export const actions = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  textAlign: 'left',
  width: '135px',
  padding: 0,
});
