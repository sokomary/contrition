import { style } from '@vanilla-extract/css';
import { MEDIA } from 'src/theme';

export const interactiveFields = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
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
  gap: '15px',

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
  gap: '20px',
  width: '100%',
  paddingBottom: '15px',

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

export const fields = style({
  width: '100%',
  display: 'flex',
  gap: '7px',
  flexDirection: 'column',

  '@media': {
    [MEDIA.ipadv]: {
      width: 'auto',
    },
  },
});

export const leftPart = style({
  display: 'flex',
  gap: '20px',
  flexDirection: 'column',
});
