import { style } from '@vanilla-extract/css';
import { MEDIA, px } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(20),
});

export const field = style({
  width: '66%',
});

export const fields = style({
  width: '100%',
  display: 'flex',
  paddingTop: px(3),
  justifyContent: 'space-between',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
});

export const actions = style({
  marginBottom: px(15),
  justifyContent: 'flex-end',

  '@media': {
    [MEDIA.ipadh]: {
      marginBottom: 0,
    },
  },
});
