import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const hiddenInput = style({
  display: 'none',
});

const REGULAR_SIZE = 363;
const SMALL_SIZE = 363;

const photo = {
  height: `${REGULAR_SIZE}px`,
  width: `${REGULAR_SIZE}px`,
  backgroundColor: color('field'),
  cursor: 'pointer',
  borderRadius: '10px',
  opacity: 30,
  flexShrink: 0,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  marginRight: 'auto',
};

export const photoInput = style({
  ...photo,

  '@media': {
    [MEDIA.ipadv]: {
      height: `${SMALL_SIZE}px`,
      width: `${SMALL_SIZE}px`,
    },
  },
});

export const photoPreview = style({
  ...photo,
  backgroundRepeat: 'no-repeat',
  backgroundOrigin: 'border-box',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',

  '@media': {
    [MEDIA.ipadv]: {
      height: `${SMALL_SIZE}px`,
      width: `${SMALL_SIZE}px`,
    },
  },
});

export const loadingWrapper = style({
  ...photo,
  opacity: 1,

  '@media': {
    [MEDIA.ipadv]: {
      height: `${SMALL_SIZE}px`,
      width: `${SMALL_SIZE}px`,
    },
  },
});
