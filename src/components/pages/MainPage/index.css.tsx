import { style } from '@vanilla-extract/css';
import { MEDIA, px, text } from 'src/theme';

export const container = style({
  width: '100%',
  paddingBlockEnd: px(40),
});

export const title = style({
  ...text.header3,
  paddingInlineStart: px(16),
  paddingBlock: px(40),

  '@media': {
    [MEDIA.ipadv]: {
      paddingInlineStart: px(20),
    },
    [MEDIA.ipadh]: {
      paddingInlineStart: px(40),
    },
  },
});
