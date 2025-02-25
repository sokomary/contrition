import { globalStyle, style } from '@vanilla-extract/css';
import { color, IPAD_H_WIDTH, IPAD_V_WIDTH } from 'src/theme';
import { PADDING_IPAD } from '../../../index.css';

export const container = style({
  backgroundColor: color('accent-light'),
  borderRadius: '20px',
  height: '174px',
});
globalStyle(container, {
  '@container': {
    [`(min-width: ${IPAD_V_WIDTH - PADDING_IPAD * 2}px)`]: {
      height: '142px',
    },
    [`(min-width:  ${IPAD_H_WIDTH - PADDING_IPAD * 2}px)`]: {
      height: '240px',
    },
  },
});

export const item = style({
  display: 'flex',
  height: '30px',
  borderRadius: '20px',
  padding: '2px 12px 4px 12px',
  alignItems: 'center',
  fontSize: '16px',
  color: color('font'),
  backgroundColor: color('basic'),
});
