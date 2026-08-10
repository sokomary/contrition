import { style } from '@vanilla-extract/css';
import { MEDIA, px } from 'src/theme';
import { CARD_SIZES } from './RecipeCard/index.css';

export const container = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_SIZES.iphone.width}, 1fr))`,
  gap: px(10),
  paddingTop: px(20),
  paddingInline: px(15),

  '@media': {
    [MEDIA.ipadv]: {
      gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_SIZES.ipadv.width}, 1fr))`,
      gap: px(20),
      paddingInline: px(20),
    },
    [MEDIA.mac]: {
      gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_SIZES.mac.width}, 1fr))`,
      gap: px(40),
      paddingInline: px(40),
    },
  },
});

export const emptyState = style({
  paddingBlock: px(40),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
