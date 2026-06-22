import { globalStyle, style } from '@vanilla-extract/css';
import { color, IPAD_V_WIDTH, px } from 'src/theme';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: `${px(6)} ${px(15)}`,
  gap: px(15),
});
globalStyle(container, {
  '@container': {
    [`(min-width: ${IPAD_V_WIDTH})`]: {
      display: 'contents',
    },
  },
});

export const action = style({
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  height: 'fit-content',
  width: 'fit-content',
  flexShrink: 0,
  borderRadius: px(20),
});
globalStyle(action, {
  '@container': {
    [`(min-width: ${IPAD_V_WIDTH})`]: {
      backgroundColor: color('accent-light'),
      height: px(62),
      width: px(62),
    },
  },
});

export const icon = style({
  cursor: 'pointer',
});

export const content = style({
  maxWidth: '100%',
  padding: '0',
  gap: px(10),
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  overflow: 'hidden',
});
globalStyle(content, {
  '@container': {
    [`(min-width: ${590}px)`]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
});
