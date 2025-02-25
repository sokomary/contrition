import { globalStyle, style } from '@vanilla-extract/css';
import { color, IPAD_H_WIDTH, MAC_WIDTH } from 'src/theme';

export const PADDING_IPHONE = 15;
export const PADDING_IPAD = 20;
export const PADDING_MAC = 40;

export const actionBar = style({});
globalStyle(actionBar, {
  containerType: 'inline-size',
});

export const container = style({
  padding: `${PADDING_IPHONE}px ${PADDING_IPHONE}px 0px ${PADDING_IPHONE}px`,
});
globalStyle(container, {
  '@container': {
    [`(min-width: ${IPAD_H_WIDTH}px)`]: {
      padding: `${PADDING_IPAD}px ${PADDING_IPAD}px 0px ${PADDING_IPAD}px`,
    },
    [`(min-width: ${MAC_WIDTH}px)`]: {
      padding: `${PADDING_MAC}px ${PADDING_MAC}px 0px ${PADDING_MAC}px`,
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  borderRadius: '20px',
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  backgroundColor: color('basic'),
  gap: 0,
});
globalStyle(content, {
  '@container': {
    [`(min-width: ${IPAD_H_WIDTH - PADDING_IPAD * 2}px)`]: {
      flexDirection: 'row',
    },
  },
});
