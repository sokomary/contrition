import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

const REGULAR_SIZE = 360;
const SMALL_SIZE = 300;

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const content = style({
  height: `${REGULAR_SIZE}px`,
  width: `${REGULAR_SIZE}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    [MEDIA.ipadv]: {
      height: `${SMALL_SIZE}px`,
      width: `${SMALL_SIZE}px`,
    },
  },
});

export const hiddenInput = style({
  display: 'none',
});

const photo = {
  flex: 1,
  height: '100%',
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

export const photoInput = style(photo);

export const photoPreview = style({
  ...photo,
  backgroundRepeat: 'no-repeat',
  backgroundOrigin: 'border-box',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
});

export const label = style({
  fontSize: '16px',
});
