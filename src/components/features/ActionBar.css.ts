import { globalStyle, style } from '@vanilla-extract/css';
import { MEDIA } from 'src/theme';

export const container = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  paddingTop: '15px',
  paddingBottom: '15px',

  '@media': {
    [MEDIA.ipadh]: {
      paddingBottom: 0,
    },
  },
});
globalStyle(`${container} > button`, {
  width: '100%',
  '@media': {
    [MEDIA.ipadv]: {
      width: 'fit-content',
    },
  },
});

export const loader = style({
  height: '20px !important',
});
