import { style } from '@vanilla-extract/css';
import { px } from '../../theme';

export const container = style({
  position: 'relative',
  width: 'fit-content',
});

export const content = style({
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
});
