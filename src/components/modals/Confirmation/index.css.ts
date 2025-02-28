import { style } from '@vanilla-extract/css';
import { MEDIA } from 'src/theme';

export const actions = style({
  marginBottom: '15px',
  justifyContent: 'flex-end',

  '@media': {
    [MEDIA.ipadh]: {
      marginBottom: 0,
    },
  },
});
