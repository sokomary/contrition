import { style } from '@vanilla-extract/css';
import { color, MEDIA, px } from 'src/theme';

export const container = style({
  borderRadius: px(20),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  backgroundColor: color('basic'),
  maxWidth: '100%',

  '@media': {
    [MEDIA.ipadv]: {
      maxWidth: '50%',
    },
  },
});
