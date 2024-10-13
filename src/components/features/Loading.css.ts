import { keyframes, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  height: '42px',
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
  width: '20px',
  height: '20px',
  border: '3px solid #f3f3f3',
  borderTop: '3px solid #383636',
  borderRadius: '50%',
  animation: `${animation} 1.5s linear infinite`,
});
