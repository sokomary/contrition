import { style } from '@vanilla-extract/css';
import { MEDIA, px } from 'src/theme';

export const interactiveFields = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(15),
  width: '100%',

  '@media': {
    [MEDIA.ipadh]: {
      display: 'contents',
    },
  },
});

export const linkWeightFields = style({
  display: 'flex',
  gap: 7,
});

export const linkField = style({
  flex: 1,
});

export const numberField = style({
  width: 104,

  '@media': {
    [MEDIA.ipadh]: {
      width: 72,
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
      flexDirection: 'row',
    },
  },
});

export const footer = style({
  display: 'flex',
  marginBottom: 0,
  flexDirection: 'column',
  gap: px(20),
  width: '100%',
  paddingBottom: px(15),
  alignItems: 'flex-end',

  '@media': {
    [MEDIA.ipadv]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 0,
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
  marginBottom: px(15),
  justifyContent: 'flex-end',

  '@media': {
    [MEDIA.ipadh]: {
      marginBottom: 0,
    },
  },
});
