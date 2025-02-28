import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { color } from 'src/theme';

export const content = style({
  display: 'flex',
  gap: '5px',
  flexWrap: 'wrap',
});

export const label = style({
  fontSize: '16px',
});

export const header = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const tag = recipe({
  base: {
    borderRadius: '7px',
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
  gap: '5px',
});
