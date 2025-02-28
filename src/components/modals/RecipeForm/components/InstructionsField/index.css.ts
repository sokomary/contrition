import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  maxHeight: 'fit-content',

  '@media': {
    [MEDIA.ipadv]: {
      width: '100%',
      maxHeight: '430px',
    },
    [MEDIA.ipadh]: {
      maxHeight: '320px',
      width: '35%',
    },
    [MEDIA.mac]: {
      maxHeight: '566px',
    },
  },
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  fontSize: '16px',
});

export const actions = style({
  padding: 0,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  justifyContent: 'space-between',
  background: color('background'),
  boxShadow: '0 0 15px 5px rgba(8, 8, 8, 0.07)',
  minHeight: '42px',
  borderRadius: '10px',
  padding: '15px',
  overflowY: 'auto',

  '@media': {
    [MEDIA.ipadh]: {
      minHeight: '34px',
    },
  },
});

export const emptyState = style({
  color: color('label'),
  textAlign: 'center',
});
