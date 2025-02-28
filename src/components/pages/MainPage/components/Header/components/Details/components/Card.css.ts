import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  padding: '7px 15px 15px 15px',
  flexDirection: 'column',
  maxHeight: '100%',
  gap: 10,
});

export const content = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const header = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  color: color('label'),
  height: '32px',
});

export const list = recipe({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    rowGap: '10px',
    height: '100%',
    overflowY: 'auto',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  variants: {
    layout: {
      vertical: {},
      horizontal: {
        flexWrap: 'unset',
        overflowY: 'hidden',
        overflowX: 'scroll',
        gap: '10px',
      },
    },
  },
});

export const title = style({
  alignItems: 'center',
  fontSize: '16px',
  color: color('label'),
});

export const divider = style({
  width: '5px',
  height: '5px',
  borderRadius: '2.5px',
  marginTop: '2px',
  backgroundColor: color('label'),
});
