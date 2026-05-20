import { keyframes, style } from '@vanilla-extract/css';
import { px } from 'src/theme';

export const container = style({
  display: 'flex',
  height: px(42),
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

const animation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const spinner = style({
  width: px(20),
  height: px(20),
  border: `${px(2)} solid #f3f3f3`,
  borderTop: `${px(2)} solid #383636`,
  borderRadius: '50%',
  animation: `${animation} 1.5s linear infinite`,
});
