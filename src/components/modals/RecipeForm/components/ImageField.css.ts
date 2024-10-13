import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';
import { MEDIA } from 'src/hooks';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const hiddenInput = style({
  display: 'none',
});

export const photoInput = style({
  backgroundColor: color('field'),
  flexShrink: 0,
  alignItems: 'center',
  height: '333px',
  width: '333px',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '10px',
  opacity: 30,

  '@media': {
    [MEDIA.iphone]: {
      marginRight: 'auto',
      height: '363px',
      width: '363px',
    },
    [MEDIA.ipadv]: {
      marginRight: 'auto',
    },
    [MEDIA.ipadh]: {
      height: '170px',
      width: '170px',
    },
  },
});

// background-image: url(${props.background}
export const photoPreview = style({
  backgroundColor: color('field'),
  flexShrink: 0,
  alignItems: 'center',
  height: '333px',
  width: '333px',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '10px',
  opacity: 30,
  backgroundRepeat: 'no-repeat',
  backgroundOrigin: 'border-box',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',

  '@media': {
    [MEDIA.iphone]: {
      marginRight: 'auto',
      height: '363px',
      width: '363px',
    },
    [MEDIA.ipadv]: {
      marginRight: 'auto',
    },
    [MEDIA.ipadh]: {
      height: '170px',
      width: '170px',
    },
  },
});

export const loadingWrapper = style({
  backgroundColor: color('field'),
  flexShrink: 0,
  alignItems: 'center',
  height: '333px',
  width: '333px',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '10px',
  opacity: 1,

  '@media': {
    [MEDIA.iphone]: {
      height: '363px',
      width: '363px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [MEDIA.ipadv]: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    [MEDIA.ipadh]: {
      height: '170px',
      width: '170px',
    },
  },
});
