import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { color, px } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(20),
});

export const label = style({
  fontSize: px(16),
  marginBottom: px(8),
});

export const friends = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: px(5),
});

export const friend = recipe({
  base: {
    borderRadius: px(7),
    color: color('font'),
    border: '1px solid',
    width: 'fit-content',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: color('accent-light'),
        color: color('accent'),
        border: 'none',
      },
      false: {
        backgroundColor: color('field'),
        borderColor: color('primary'),
      },
    },
  },
});

export const actions = style({
  justifyContent: 'flex-end',
});
