import { globalStyle, style } from '@vanilla-extract/css';
import { IPAD_H_WIDTH, IPAD_V_WIDTH, MAC_WIDTH } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';
import { PADDING_IPAD, PADDING_IPHONE, PADDING_MAC } from '../../index.css';

export const container = recipe({
  base: {
    overflow: 'hidden',
    transition: 'max-height 1s 0s',
  },
  variants: {
    open: {
      true: {
        maxHeight: '650px',
      },
      false: {
        maxHeight: 0,
      },
    },
  },
});

export const animated = recipe({
  base: {
    transition: 'transform 1s ease-in-out, opacity 1s',
  },
  variants: {
    open: {
      true: {
        transform: 'translateY(0)',
      },
      false: {
        transform: 'translateY(-100%)',
      },
    },
  },
});
globalStyle(animated.classNames.variants.open.true, {
  containerType: 'inline-size',
});

export const content = style({
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: '20px',
  paddingInline: `${PADDING_IPHONE}px`,
  gap: '15px',
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
      gap: '10px',
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
  minWidth: '200px',
  flexShrink: 0,
  flex: 1,
  gap: '15px',
});
globalStyle(controls, {
  '@container': {
    [`(min-width: ${IPAD_V_WIDTH - PADDING_IPAD * 2}px)`]: {
      gap: '10px',
    },
    [`(min-width:  ${IPAD_H_WIDTH - PADDING_IPAD * 2}px)`]: {
      flexDirection: 'row',
    },
  },
});
