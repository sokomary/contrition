import { recipe } from '@vanilla-extract/recipes';
import { SIDE_MODAL_WIDTH } from '../../modals';
import { style } from '@vanilla-extract/css';
import { MEDIA, px, text } from '../../../theme';

export const container = recipe({
  base: {
    height: '100vh',
    width: '100%',
  },
  variants: {
    withSide: {
      true: { width: `calc(100% - ${SIDE_MODAL_WIDTH}px)` },
    },
  },
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
