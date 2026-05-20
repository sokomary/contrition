import { style } from '@vanilla-extract/css';
import { px, vars } from '../../theme';

export const container = style({
  position: 'relative',
  width: 'fit-content',
});

export const content = style({
  position: 'absolute',
  top: 'anchor(bottom)',
  left: 'anchor(left)',
  margin: 0,
  border: 'none',
  marginBlock: px(5),
  boxSizing: 'border-box',
  maxWidth: '100vw',
  overflow: 'hidden',
  padding: 0,
  background: 'transparent',
  borderRadius: vars['radius-03'],
  positionTryFallbacks:
    '--below-right, ' +
    '--above-left, ' +
    '--below-left, ' +
    '--above-right, ' +
    '--above-center, ' +
    '--below-center',
});
