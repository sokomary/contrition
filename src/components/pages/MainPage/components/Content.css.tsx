import { style } from '@vanilla-extract/css';
import { MEDIA, px } from 'src/theme';
import { CARD_SIZES } from './RecipeCard/index.css';

export const container = style({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: px(10),
  paddingTop: px(20),
  rowGap: px(20),
  paddingInline: px(15),

  '@media': {
    [MEDIA.ipadv]: {
      rowGap: px(20),
      paddingInline: px(20),
    },
    [MEDIA.mac]: {
      rowGap: px(40),
      paddingInline: px(40),
    },
  },
});

export const emptyState = style({
  marginBlockStart: px(140),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const fakeCard = style({
  width: CARD_SIZES.iphone.width,

  '@media': {
    [MEDIA.ipadv]: {
      width: CARD_SIZES.ipadv.width,
    },
    [MEDIA.ipadh]: {
      width: CARD_SIZES.ipadh.width,
    },
    [MEDIA.mac]: {
      width: CARD_SIZES.mac.width,
    },
  },
});
