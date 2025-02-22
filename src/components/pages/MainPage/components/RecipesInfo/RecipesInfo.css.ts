import { globalStyle, style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const styledRecipeCard = style({
  backgroundColor: color('favorite'),
  boxShadow: 'none',
});

export const animated = recipe({
  base: {
    '@media': {
      [MEDIA.ipadh]: {
        transitionDuration: '0.5s',
      },
      [MEDIA.ipadv]: {
        transitionDuration: '0.5s',
      },
      [MEDIA.iphone]: {
        transitionDuration: '1s',
      },
      [MEDIA.mac]: {
        transitionDuration: '1s',
      },
    },
  },
  variants: {
    open: {
      true: {
        visibility: 'visible',
        marginTop: 0,
        transition: 'margin-top',
        transitionDelay: '0s',
      },
      false: {
        marginTop: '-590px',
        visibility: 'hidden',
        transition: 'margin-top 0.5s, visibility 0s 4s',
      },
    },
  },
});
globalStyle(animated.classNames.variants.open.true, {
  containerType: 'inline-size',
});

export const infoContainer = style({
  display: 'flex',
  padding: '20px 40px',
  width: '100%',
  gap: '20px',

  '@media': {
    [MEDIA.ipadh]: {
      padding: '20px',
      gap: '10px',
    },
    [MEDIA.ipadv]: {
      padding: '20px',
      gap: '10px',
    },
    [MEDIA.iphone]: {
      flexDirection: 'column',
      height: 'fit-content',
      padding: '15px',
      gap: '15px',
    },
  },
});
globalStyle(infoContainer, {
  '@container': {
    '(max-width: 605px)': {
      flexDirection: 'column',
      height: 'fit-content',
      padding: '15px',
      gap: '15px',
    },
  },
});

globalStyle(infoContainer, {
  containerType: 'inline-size',
});

export const controlsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  height: '100%',
  width: '30%',
  minWidth: '200px',
  flexShrink: 0,

  '@media': {
    [MEDIA.ipadh]: {
      width: '60%',
      height: '240px',
      flexDirection: 'row',
      gap: '10px',
    },
    [MEDIA.ipadv]: {
      width: '50%',
      gap: '10px',
    },
    [MEDIA.iphone]: {
      flexDirection: 'column',
      width: '100%',
      gap: '15px',
    },
  },
});
globalStyle(controlsContainer, {
  '@container': {
    '(max-width: 605px)': {
      flexDirection: 'column',
      width: '100%',
      gap: '15px',
      height: 'fit-content',
    },
  },
});

export const tagsControlCard = style({
  borderRadius: '20px',
  backgroundColor: color('favorite'),

  '@media': {
    [MEDIA.ipadh]: {
      height: '100%',
      minWidth: '260px',
    },
  },
});
globalStyle(tagsControlCard, {
  '@container': {
    '(max-width: 605px)': {
      height: '100%',
      minWidth: '260px',
    },
  },
});

export const productsControlCard = style({
  backgroundColor: color('accent-light'),
  borderRadius: '20px',
  height: '231px',

  '@media': {
    [MEDIA.ipadh]: {
      height: '100%',
    },
    [MEDIA.ipadv]: {
      height: '142px',
    },
    [MEDIA.iphone]: {
      height: '174px',
    },
  },
});
globalStyle(productsControlCard, {
  '@container': {
    '(max-width: 605px)': {
      height: '174px',
    },
  },
});

export const favoritesControlCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: 'calc(70% - 20px)',
  flexShrink: 0,
  borderRadius: '20px',
  backgroundColor: color('basic'),
  padding: '15px 15px 0 15px',
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  height: '340px',

  '@media': {
    [MEDIA.ipadh]: {
      height: '240px',
      width: 'calc(40% - 10px)',
    },
    [MEDIA.ipadv]: {
      width: 'calc(50% - 10px)',
      height: '240px',
    },
    [MEDIA.iphone]: {
      width: '100%',
      height: '242px',
    },
  },
});
globalStyle(favoritesControlCard, {
  '@container': {
    '(max-width: 605px)': {
      width: '100%',
      height: '242px',
    },
  },
});

export const recipesList = style({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'auto',
  gap: '20px',
  width: '100%',
  maxWidth: '100%',
  '::-webkit-scrollbar': {
    backgroundColor: 'transparent',
  },
});

export const controlName = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '16px',
  color: color('label'),
});

export const dotsDivider = style({
  width: '5px',
  height: '5px',
  borderRadius: '2.5px',
  marginTop: '2px',
  backgroundColor: color('label'),
});
