import { style } from '@vanilla-extract/css';
import { MEDIA } from 'src/hooks';
import { color } from 'src/theme';

export const interactiveFields = style({
  width: '100%',

  '@media': {
    [MEDIA.ipadh]: {
      display: 'contents',
    },
    [MEDIA.iphone]: {
      display: 'contents',
    },
    [MEDIA.mac]: {
      display: 'contents',
    },
  },
});

export const nameField = style({
  width: 332,

  '@media': {
    [MEDIA.iphone]: {
      width: 'auto',
    },
  },
});

export const linkField = style({
  width: '100%',
  '@media': {
    [MEDIA.iphone]: {
      width: '100%',
    },
  },
});

export const linkWeightFields = style({
  display: 'flex',
  width: '100%',
  gap: 7,

  '@media': {
    [MEDIA.iphone]: {
      justifyContent: 'space-between',
    },
  },
});

export const numberField = style({
  width: 72,

  '@media': {
    [MEDIA.iphone]: {
      width: 104,
    },
  },
});

export const dialog = style({
  '@media': {
    [MEDIA.ipadh]: {
      width: '100%',
      height: '60%',
    },
    [MEDIA.ipadv]: {
      width: '100%',
    },
    [MEDIA.iphone]: {
      width: '100%',
      height: '100%',
    },
    [MEDIA.mac]: {
      height: '67%',
    },
  },
});

export const loadingWrapper = style({
  width: '100%',
  height: '100%',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: 20,
});

export const content = style({
  display: 'flex',
  gap: '10px',

  '@media': {
    [MEDIA.iphone]: {
      flexDirection: 'column',
      gap: '20px',
    },
    [MEDIA.ipadh]: {
      gap: '30px',
    },
  },
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 0,

  '@media': {
    [MEDIA.iphone]: {
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      paddingBottom: '15px',
    },
  },
});

export const button = style({
  alignSelf: 'flex-end',

  '@media': {
    [MEDIA.iphone]: {
      width: '100%',
    },
  },
});

export const fields = style({
  display: 'flex',
  gap: '7px',
  flexDirection: 'column',

  '@media': {
    [MEDIA.iphone]: {
      width: '100%',
    },
  },
});

export const leftPart = style({
  display: 'flex',
  gap: '20px',
  flexDirection: 'column',
});
