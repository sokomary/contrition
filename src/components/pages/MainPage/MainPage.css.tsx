import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { MEDIA } from 'src/theme';

export const pagewrap = recipe({
  base: {
    height: '100vh',
    width: '100%',
  },
  variants: {
    withSide: {
      false: {},
      true: { width: 'calc(100% - 577px)' },
    },
  },
});

export const page = style({
  height: '100vh',
  width: '100%',
});

export const content = style({
  position: 'relative',
});

export const cards = style({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '10px',
  rowGap: '40px',
  padding: '20px 40px 0 40px',

  '@media': {
    [MEDIA.ipadv]: {
      padding: '20px 20px 0 20px;',
      rowGap: '20px',
    },
    [MEDIA.ipadh]: {
      padding: '20px 20px 0 20px;',
      rowGap: '20px',
    },
    [MEDIA.iphone]: {
      padding: '15px 15px 0 15px;',
      rowGap: '20px',
    },
  },
});

export const progressLoading = style({
  width: '100%',
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const noRecipes = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    [MEDIA.mac]: {
      height: '100%',
    },
  },
});

export const fakeCard = style({
  width: '268px',

  '@media': {
    [MEDIA.ipadh]: {
      width: '268px',
    },
    [MEDIA.ipadv]: {
      width: '242px',
    },
    [MEDIA.iphone]: {
      width: '170px',
    },
  },
});
