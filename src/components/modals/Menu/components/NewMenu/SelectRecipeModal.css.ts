import { globalStyle, style } from '@vanilla-extract/css';
import { CARD_SIZES } from 'src/components/pages/MainPage/components/RecipeCard/index.css';
import { color, MEDIA, px } from 'src/theme';

export const container = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_SIZES.iphone.width}, 1fr))`,
  gap: px(10),
  paddingTop: px(20),
});

export const content = style({
  background: color('field'),
  paddingInline: px(13),
  paddingBlockStart: px(23),
  paddingBlockEnd: px(13),
  marginBlockStart: px(-13),
  borderRadius: `0 0 ${px(10)}  ${px(10)}`,
  boxSizing: 'border-box',
  width: CARD_SIZES.iphone.width,
  display: 'flex',
  justifyContent: 'center',
});

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: px(15),
});

export const filters = style({
  paddingInline: 0,
  justifyContent: 'center',
});
globalStyle(`${filters} > div:first-of-type`, {
  flex: 1,
  '@media': {
    [MEDIA.ipadv]: {
      flexDirection: 'row',
    },
  },
});
