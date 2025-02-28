import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  borderRadius: '15px',
  padding: '10px 15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const meal = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  alignItems: 'center',
  textAlign: 'center',
  padding: '5px',
});

export const row = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const kindLabel = style({
  width: '100px',
  textAlign: 'center',
});

export const dateLabel = style({
  width: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const empty = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    width: '100px',
    border: '1px dashed gray',
    borderRadius: '5px',
  },
  variants: {
    selected: {
      true: {
        borderColor: color('accent'),
      },
    },
  },
});
