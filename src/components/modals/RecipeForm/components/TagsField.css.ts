import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { color } from 'src/theme';

export const styledContainer = style({
  display: 'flex',
  gap: '5px',
  flexWrap: 'wrap',
});

export const tag = recipe({
  base: {
    borderRadius: '7px',
    color: color('font'),
    border: `1px solid`,
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

export const button = style({
  fontSize: '16px',
  color: color('primary'),
  cursor: 'pointer',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const actions = style({
  justifyContent: 'flex-start',
  padding: 0,
});
