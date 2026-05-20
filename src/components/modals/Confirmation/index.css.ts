import { style } from '@vanilla-extract/css';
import { MEDIA, px } from 'src/theme';

export const actions = style({
  marginBottom: px(15),
  justifyContent: 'flex-end',

  '@media': {
    [MEDIA.ipadh]: {
      marginBottom: 0,
    },
  },
});
