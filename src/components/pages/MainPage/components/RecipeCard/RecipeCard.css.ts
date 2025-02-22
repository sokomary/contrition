import { recipe } from '@vanilla-extract/recipes';
import { color, MEDIA } from 'src/theme';
import { globalStyle, keyframes, style } from '@vanilla-extract/css';

export const card = recipe({
  base: {
    width: '268px',
    display: 'flex',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: '20px',
    background: color('basic'),

    '@media': {
      [MEDIA.iphone]: {
        width: '170px',
        height: '170px',
        borderRadius: '15px',
      },
      [MEDIA.ipadh]: {
        width: '268px',
        height: '268px',
      },
      [MEDIA.ipadv]: {
        width: '242px',
        height: '242px',
        borderRadius: '15px',
      },
    },
  },
  variants: {
    displayInfo: {
      true: {
        height: '345px',
        boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
      },
      false: {
        height: '268px',
        boxShadow: 'none',
      },
    },
    small: {
      true: {
        '@media': {
          [MEDIA.ipadh]: {
            width: '170px',
            height: '170px',
            borderRadius: '15px',
          },
          [MEDIA.ipadv]: {
            width: '170px',
            height: '170px',
            borderRadius: '15px',
          },
        },
      },
    },
  },
});

export const linkIcon = style({
  height: '16px',
  width: '16px',
  marginBottom: '1px',
});

export const container = style({
  width: '100%',
  height: '100%',
});

export const favoriteIcon = style({
  height: '16px',
  width: '16px',
  position: 'absolute',
  right: '10px',
  top: '10px',
});

export const toMenuButton = style({
  position: 'absolute',
  left: '55px',
  top: '10px',
});

export const calories = style({
  padding: '5px 10px',
  borderRadius: '15px',
  fontSize: '14px',
  zIndex: 80,
  position: 'absolute',
  left: '10px',
  top: '10px',
  color: color('accent'),
  backgroundColor: color('accent-light'),
});

export const element = style({
  fontSize: '16px',
  borderRadius: '12px',
  height: '44px',
  width: '44px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color('accent'),
  backgroundColor: color('accent-light'),
});

export const bigElement = style({
  fontSize: '20px',
  fontWeight: 'bold',
  borderRadius: '15px',
  height: '63px',
  width: '63px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color('accent'),
  backgroundColor: color('accent-light'),
});

const imgAppearance = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const img = style({
  width: '100%',
  height: '100%',
  animationName: imgAppearance,
  animationDuration: '3s',
  animationTimingFunction: 'cubic-bezier(.1,-.6,.2,0)',
  cursor: 'pointer',
  flexShrink: 0,

  '@media': {
    [MEDIA.mac]: {
      width: '268px',
      height: '268px',
    },
  },
});

export const infoFooter = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});
export const elements = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  height: 'fit-content',
  gap: '4px',
});

export const recipeNameContainer = style({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  padding: '15px 10px',
  fontSize: '16px',
  backgroundColor: color('field'),

  '@media': {
    [MEDIA.iphone]: {
      fontSize: '14px',
      height: '40px',
      padding: '10px',
    },
  },
});
globalStyle(`${recipeNameContainer} > div:first-of-type`, {
  display: 'flex',
  justifyContent: 'space-between',
});

export const recipeName = style({
  width: '248px',
  overflow: 'hidden',
  display: 'inline-block',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const tags = style({
  display: 'flex',
  gap: '4px',
  width: '100%',
});

export const tag = style({
  color: color('label'),
  cursor: 'pointer',
});

export const restTagsCount = style({
  borderRadius: '5px',
  padding: '0 5px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: color('accent'),
});

export const link = style({
  height: '18px',
  alignSelf: 'flex-start',
  marginTop: '2px',
});

export const info = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px',
});

export const content = recipe({
  base: {
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
    width: '100%',
    height: '100%',
    borderRadius: '15px',

    '@media': {
      [MEDIA.mac]: {
        width: '268px',
        height: '268px',
      },
    },
  },
  variants: {
    displayInfo: {
      true: {
        borderRadius: '20px 20px 0 0',
      },
      false: {
        borderRadius: '20px',
      },
    },
  },
});

export const infoFirstPart = style({
  display: 'flex',
  gap: '4px',
});

export const tooltip = style({
  backgroundColor: 'transparent',
  zIndex: 150,
});
