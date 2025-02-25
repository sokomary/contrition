import { recipe } from '@vanilla-extract/recipes';
import { SIDE_MODAL_WIDTH } from '../../modals';

export const container = recipe({
  base: {
    height: '100vh',
    width: '100%',
  },
  variants: {
    withSide: {
      true: { width: `calc(100% - ${SIDE_MODAL_WIDTH}px)` },
    },
  },
});
