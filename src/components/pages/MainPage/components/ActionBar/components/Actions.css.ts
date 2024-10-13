import { style } from '@vanilla-extract/css';
import { MEDIA } from 'src/hooks';

export const container = style({
  display: 'flex',
  gap: '10px',
});

export const button = style({
  '@media': {
    [MEDIA.iphone]: {
      borderRadius: '10px',
      height: '30px',
    },
  },
});

export const icon = style({
  '@media': {
    [MEDIA.iphone]: {
      height: '20px',
      width: '20px',
    },
  },
});
