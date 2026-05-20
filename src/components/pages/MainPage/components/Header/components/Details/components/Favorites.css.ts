import { globalStyle, style } from '@vanilla-extract/css';
import { color, IPAD_V_WIDTH, px } from 'src/theme';
import { PADDING_IPAD } from '../../../index.css';

export const container = style({
  borderRadius: px(20),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  flex: 1,
  backgroundColor: color('basic'),
});
globalStyle(container, {
  '@container': {
    [`(min-width: ${IPAD_V_WIDTH - PADDING_IPAD * 2}px)`]: {
      width: '50%',
    },
  },
});
