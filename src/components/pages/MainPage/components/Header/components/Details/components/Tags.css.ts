import { globalStyle, style } from '@vanilla-extract/css';
import { color, IPAD_H_WIDTH, px } from 'src/theme';
import { PADDING_IPAD } from '../../../index.css';

export const container = style({
  height: '100%',
  borderRadius: px(20),
  backgroundColor: color('favorite'),
});
globalStyle(container, {
  '@container': {
    [`(min-width: ${IPAD_H_WIDTH - PADDING_IPAD * 2}px)`]: {
      minWidth: px(260),
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
});
