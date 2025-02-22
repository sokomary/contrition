import { style } from '@vanilla-extract/css';
import { MEDIA } from 'src/theme';

export const container = style({
  display: 'flex',
  gap: '10px',
});

export const button = style({
  '@media': {
    [MEDIA.ipadv]: {
      borderRadius: '10px',
      height: '30px',
    },
    [MEDIA.iphone]: {
      borderRadius: '10px',
      height: '30px',
    },
  },
});

export const icon = style({
  '@media': {
    [MEDIA.ipadv]: {
      height: '20px',
      width: '20px',
    },
    [MEDIA.iphone]: {
      height: '20px',
      width: '20px',
    },
  },
});
