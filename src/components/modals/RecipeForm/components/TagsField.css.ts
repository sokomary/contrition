import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { color, px } from 'src/theme';

export const content = style({
  display: 'flex',
  gap: px(5),
  flexWrap: 'wrap',
});

export const label = style({
  fontSize: px(16),
});

export const header = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const tag = recipe({
  base: {
    borderRadius: px(7),
    color: color('font'),
    border: `1px solid`,
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

export const container = style({
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: px(5),
});
