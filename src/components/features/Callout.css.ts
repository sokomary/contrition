import { recipe } from '@vanilla-extract/recipes';
import { color, px } from 'src/theme';

export const container = recipe({
  base: {
    position: 'relative',
  },
  variants: {
    width: {
      fit: { width: 'fit-content' },
      full: { width: '100%' },
    },
  },
  defaultVariants: {
    width: 'fit',
  },
});

export const content = recipe({
  base: {
    position: 'fixed',
    top: 'anchor(bottom)',
    left: 'anchor(left)',
    bottom: 'auto',
    right: 'auto',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
    maxHeight: `calc(100dvh - ${px(20)})`,
    maxWidth: '100dvw',
    overflow: 'auto',
    overscrollBehavior: 'contain',
    margin: 0,
    marginBlock: px(5),
    border: 'none',
    boxSizing: 'border-box',
    padding: 0,
    background: 'transparent',
    borderRadius: px(10),

    '@media': {
      '(prefers-color-scheme: light)': {
        border: `${px(0.5)} solid`,
        borderColor: color('label'),
      },
    },
  },
  variants: {
    width: {
      fit: {},
      full: { width: 'anchor-size(width)' },
    },
  },
  defaultVariants: {
    width: 'fit',
  },
});
