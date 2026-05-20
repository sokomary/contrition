import { recipe } from '@vanilla-extract/recipes';
import { color, MEDIA, px } from 'src/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const CARD_SIZES = {
  iphone: {
    width: px(170),
    height: px(170),
  },
  ipadh: {
    width: px(242),
    height: px(242),
  },
  ipadv: {
    width: px(242),
    height: px(242),
  },
  mac: {
    width: px(268),
    height: px(268),
  },
};
export const card = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: px(15),
    background: color('basic'),
  },
  variants: {
    displayInfo: {
      true: {
        boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
      },
      false: {
        boxShadow: 'none',
      },
    },
  },
});

export const linkIcon = style({
  height: px(16),
  width: px(16),
  marginBottom: px(1),
});

export const container = style({
  width: '100%',
  height: 'fit-content',
});

export const favoriteIcon = style({
  height: px(16),
  width: px(16),
  position: 'absolute',
  right: px(10),
  top: px(10),
});

export const toMenuButton = style({
  position: 'absolute',
  left: px(55),
  top: px(10),
});

export const calories = style({
  padding: `${px(5)} ${px(10)}`,
  borderRadius: px(15),
  fontSize: px(14),
  position: 'absolute',
  left: px(10),
  top: px(10),
  color: color('accent'),
  backgroundColor: color('accent-light'),
});

export const element = style({
  fontSize: px(16),
  borderRadius: px(12),
  height: px(44),
  width: px(44),
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color('accent'),
  backgroundColor: color('accent-light'),
});

export const bigElement = style({
  fontSize: px(20),
  fontWeight: 'bold',
  borderRadius: px(15),
  height: px(63),
  width: px(63),
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color('accent'),
  backgroundColor: color('accent-light'),
});

export const img = style({
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  flexShrink: 0,
  objectFit: 'cover',
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
  gap: px(4),
});

export const recipeNameContainer = style({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  backgroundColor: color('field'),
  fontSize: px(14),
  height: px(40),
  padding: px(10),

  '@media': {
    [MEDIA.ipadv]: {
      fontSize: px(16),
      height: 'fit-content',
      padding: `${px(15)} ${px(10)}`,
    },
  },
});
globalStyle(`${recipeNameContainer} > div:first-of-type`, {
  display: 'flex',
  justifyContent: 'space-between',
});

export const recipeName = style({
  width: px(248),
  overflow: 'hidden',
  display: 'inline-block',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const tags = style({
  display: 'flex',
  gap: px(4),
  width: '100%',
});

export const tag = style({
  color: color('label'),
  cursor: 'pointer',
});

export const restTagsCount = style({
  borderRadius: px(5),
  padding: `0 ${px(5)}`,
  color: 'white',
  fontWeight: 'bold',
  fontSize: px(12),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: color('accent'),
});

export const link = style({
  height: px(18),
  alignSelf: 'flex-start',
  marginTop: px(2),
});

export const info = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: px(8),
});

export const content = recipe({
  base: {
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: px(15),
    ...CARD_SIZES.iphone,
  },
  variants: {
    small: {
      false: {
        '@media': {
          [MEDIA.ipadh]: CARD_SIZES.ipadh,
          [MEDIA.ipadv]: CARD_SIZES.ipadv,
          [MEDIA.mac]: CARD_SIZES.mac,
        },
      },
    },
    displayInfo: {
      true: {
        borderRadius: `${px(15)} ${px(15)} 0 0`,
      },
    },
  },
});

export const infoFirstPart = style({
  display: 'flex',
  gap: px(4),
});
