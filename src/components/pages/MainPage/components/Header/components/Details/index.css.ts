import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { MEDIA, px } from 'src/theme';
import { PADDING_IPAD, PADDING_IPHONE, PADDING_MAC } from '../../index.css';

export const container = recipe({
  base: {
    overflow: 'hidden',
    transition: 'max-height 0.2s 0s ease-in-out',
  },
  variants: {
    open: {
      true: {
        maxHeight: px(650),
      },
      false: {
        maxHeight: 0,
      },
    },
  },
});

export const content = style({
  height: 'fit-content',
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
  height: '100%',
  minWidth: px(200),
  flexShrink: 0,
  flex: 1,
  gap: px(15),

  '@media': {
    [MEDIA.ipadh]: {
      flexDirection: 'row',
    },
  },
});
