import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { MEDIA, px } from 'src/theme';
import { PADDING_IPAD, PADDING_IPHONE, PADDING_MAC } from '../../index.css';

export const wrapper = recipe({
  base: {
    display: 'grid',
    gridTemplateRows: '0fr',
    visibility: 'hidden',
    transition: 'grid-template-rows 0.3s ease, visibility 0.3s',
  },

  variants: {
    open: {
      true: {
        gridTemplateRows: '1fr',
        visibility: 'visible',
      },
    },
  },

  defaultVariants: {
    open: false,
  },
});

export const inner = style({
  minHeight: 0,
  overflow: 'hidden',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: px(20),
  paddingInline: `${px(PADDING_IPHONE)}`,
  gap: px(15),

  '@media': {
    [MEDIA.ipadv]: {
      flexDirection: 'row',
      paddingInline: `${px(PADDING_IPAD)}`,
    },
    [MEDIA.ipadh]: {
      flexDirection: 'row',
      paddingInline: `${px(PADDING_MAC)}`,
    },
  },
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: px(15),

  '@media': {
    [MEDIA.ipadh]: {
      flexDirection: 'row',
    },
  },
});
