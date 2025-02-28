import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const container = style({
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '24px',

  '@media': {
    [MEDIA.ipadv]: {
      gap: '24px',
    },
  },
});

export const actions = style({
  background: color('background'),
  justifyContent: 'space-between',
  borderRadius: '20px',
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  padding: '5px 15px',
});
