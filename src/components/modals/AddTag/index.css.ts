import { style } from '@vanilla-extract/css';
import { MEDIA } from '../../../theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

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

export const actions = style({
  marginBottom: '15px',
  justifyContent: 'flex-end',

  '@media': {
    [MEDIA.ipadh]: {
      marginBottom: 0,
    },
  },
});
