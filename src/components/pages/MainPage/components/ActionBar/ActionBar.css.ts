import { globalStyle, style } from '@vanilla-extract/css';
import { MEDIA } from 'src/hooks';
import { color } from 'src/theme';

export const actionBar = style({
  padding: '40px 40px 20px 40px',

  '@media': {
    [MEDIA.ipadv]: {
      padding: '20px',
    },
    [MEDIA.ipadh]: {
      padding: '20px',
    },
    [MEDIA.iphone]: {
      padding: '15px',
    },
  },
});

export const filtersContainer = style({
  display: 'contents',
  '@media': {
    [MEDIA.iphone]: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '6px 15px',
      gap: '15px',
    },
  },
});
globalStyle(filtersContainer, {
  '@container': {
    '(max-width: 600px)': {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '6px 15px',
      gap: '15px',
    },
  },
});

export const infoControl = style({
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  height: '62px',
  width: '62px',
  borderRadius: '20px',
  backgroundColor: color('accent-light'),

  '@media': {
    [MEDIA.iphone]: {
      backgroundColor: 'transparent',
      height: 'fit-content',
      width: 'fit-content',
    },
  },
});
globalStyle(infoControl, {
  '@container': {
    '(max-width: 600px)': {
      backgroundColor: 'transparent',
      height: 'fit-content',
      width: 'fit-content',
    },
  },
});

export const icon = style({
  cursor: 'pointer',
});

globalStyle(actionBar, {
  containerType: 'inline-size',
});
export const actionBarContent = style({
  display: 'flex',
  borderRadius: '20px',
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  backgroundColor: color('basic'),
  gap: 0,
});
globalStyle(actionBarContent, {
  '@container': {
    '(max-width: 600px)': {
      flexDirection: 'column-reverse',
    },
  },
});

export const filters = style({
  display: 'flex',
  width: '70%',
  padding: '0 10px',

  '@media': {
    [MEDIA.iphone]: {
      width: '100%',
      gap: '10px',
      padding: '0',
      justifyContent: 'space-between',
    },
  },
});
globalStyle(filters, {
  '@container': {
    '(max-width: 600px)': {
      width: '100%',
      gap: '10px',
      padding: '0',
      justifyContent: 'space-between',
    },
  },
});

export const userBlock = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '30%',
  backgroundColor: color('accent-light'),
  alignItems: 'center',
  padding: '0 10px',
  borderRadius: 'inherit',

  '@media': {
    [MEDIA.iphone]: {
      width: '100%',
      height: '58px',
      padding: '0 15px',
      gap: '10px',
    },
  },
});
globalStyle(userBlock, {
  '@container': {
    '(max-width: 600px)': {
      width: '100%',
      height: '58px',
      padding: '0 15px',
      gap: '10px',
    },
  },
});
globalStyle(userBlock, {
  containerType: 'inline-size',
});

export const name = style({
  display: 'unset',
  alignSelf: 'center',
  fontSize: '16px',
  paddingLeft: '5px',
});
globalStyle(name, {
  '@container': {
    '(max-width: 400px)': {
      display: 'none',
    },
  },
});

export const circleImg = style({
  height: '40px',
  width: '40px',
  borderRadius: '20px',
  backgroundColor: color('background'),
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '@media': {
    [MEDIA.iphone]: {
      height: '30px',
      width: '30px',
      borderRadius: '15px',
    },
  },
});
globalStyle(circleImg, {
  '@container': {
    '(max-width: 600px)': {
      height: '30px',
      width: '30px',
      borderRadius: '15px',
    },
  },
});

export const photo = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const content = style({
  display: 'flex',
  gap: '10px',
});
