import { globalStyle, style } from '@vanilla-extract/css';
import { color, IPAD_V_WIDTH } from 'src/theme';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '6px 15px',
  gap: '15px',
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
  borderRadius: '20px',
});
globalStyle(action, {
  '@container': {
    [`(min-width: ${IPAD_V_WIDTH})`]: {
      backgroundColor: color('accent-light'),
      height: '62px',
      width: '62px',
    },
  },
});

export const icon = style({
  cursor: 'pointer',
});

export const content = style({
  width: '100%',
  padding: '0',
  gap: '10px',
  display: 'flex',
  flexDirection: 'column',
});
globalStyle(content, {
  '@container': {
    [`(min-width: ${590}px)`]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
});
