import { globalStyle, style } from '@vanilla-extract/css';
import { MEDIA } from 'src/hooks';

export const container = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  paddingTop: '15px',

  '@media': {
    [MEDIA.iphone]: {
      paddingBottom: '15px',
    },
  },
});
globalStyle(`${container} > button`, {
  '@media': {
    [MEDIA.iphone]: {
      width: '100%',
    },
  },
});
