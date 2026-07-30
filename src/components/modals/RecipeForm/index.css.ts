import { style } from '@vanilla-extract/css';
import { MEDIA, px } from 'src/theme';

export const rowFields = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(7),

  '@media': {
    [MEDIA.ipadv]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: 20,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(40),

  '@media': {
    [MEDIA.ipadv]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
});

export const button = style({
  alignSelf: 'flex-end',
  width: '100%',

  '@media': {
    [MEDIA.ipadv]: {
      width: 'fit-content',
    },
  },
});

export const basicFields = style({
  display: 'flex',
  gap: px(10),
  flexDirection: 'column',
});

export const actions = style({
  justifyContent: 'flex-end',
});
