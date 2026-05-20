import { globalStyle, style } from '@vanilla-extract/css';
import { color, IPAD_H_WIDTH, IPAD_V_WIDTH, px } from 'src/theme';
import { PADDING_IPAD } from '../../../index.css';

export const container = style({
  backgroundColor: color('accent-light'),
  borderRadius: px(20),
  height: px(174),
  flex: 1,
});
globalStyle(container, {
  '@container': {
    [`(min-width: ${IPAD_V_WIDTH - PADDING_IPAD * 2}px)`]: {
      height: px(142),
    },
    [`(min-width:  ${IPAD_H_WIDTH - PADDING_IPAD * 2}px)`]: {
      height: px(240),
    },
  },
});

export const item = style({
  display: 'flex',
  height: px(30),
  borderRadius: px(20),
  padding: `${px(2)} ${px(12)} ${px(4)} ${px(12)}`,
  alignItems: 'center',
  fontSize: px(16),
  color: color('font'),
  backgroundColor: color('basic'),
  width: 'fit-content',
});
