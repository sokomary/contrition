import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { IPAD_H_WIDTH, IPAD_V_WIDTH, MAC_WIDTH, px } from 'src/theme';
import { PADDING_IPAD, PADDING_IPHONE, PADDING_MAC } from '../../index.css';

export const container = recipe({
  base: {
    overflow: 'hidden',
    transition: 'max-height 0.3s 0s',
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
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: px(20),
  paddingInline: `${PADDING_IPHONE}px`,
  gap: px(15),
});
globalStyle(content, {
  containerType: 'inline-size',
});
globalStyle(content, {
  '@container': {
    [`(min-width: ${IPAD_V_WIDTH}px)`]: {
      flexDirection: 'row',
    },
    [`(min-width: ${IPAD_H_WIDTH}px)`]: {
      paddingInline: `${PADDING_IPAD}px`,
      gap: px(10),
    },
    [`(min-width: ${MAC_WIDTH}px)`]: {
      paddingInline: `${PADDING_MAC}px`,
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
});
globalStyle(controls, {
  '@container': {
    [`(min-width: ${IPAD_V_WIDTH - PADDING_IPAD * 2}px)`]: {
      gap: px(10),
    },
    [`(min-width:  ${IPAD_H_WIDTH - PADDING_IPAD * 2}px)`]: {
      flexDirection: 'row',
    },
  },
});
