import { style } from '@vanilla-extract/css';
import { MEDIA } from 'src/theme';
import { CARD_SIZES } from './RecipeCard/index.css';

export const container = style({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '10px',
  paddingTop: '20px',
  rowGap: '20px',
  paddingInline: '15px',

  '@media': {
    [MEDIA.ipadv]: {
      rowGap: '20px',
      paddingInline: '20px',
    },
    [MEDIA.mac]: {
      rowGap: '40px',
      paddingInline: '40px',
    },
  },
});

export const emptyState = style({
  width: '100%',
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
