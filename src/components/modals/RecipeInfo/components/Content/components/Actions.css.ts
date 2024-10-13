import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const actionButton = style({
  color: color('primary'),
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '16px',
});

export const actionsCard = style({
  background: color('background'),
  justifyContent: 'space-between',
  display: 'flex',
  flexShrink: 0,
  borderRadius: '20px',
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  padding: '5px 15px',
});
