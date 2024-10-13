import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  position: 'absolute',
  borderRadius: '5px',
  background: '#FFF',
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  padding: '8px',
  flexDirection: 'column',
  gap: '8px',
  right: '0',
  top: '45px',
});

export const option = style({
  width: '70px',
  height: '25px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 4px',
});
