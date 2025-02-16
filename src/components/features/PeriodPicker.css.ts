import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  position: 'relative',
  width: 'fit-content',
});

export const icon = style({
  stroke: color('primary'),
  cursor: 'pointer',
});

export const picker = style({
  position: 'absolute',
  padding: '10px',
  backgroundColor: color('background'),
  borderRadius: '10px',
  top: 30,
  width: '250px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
});

export const header = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const control = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const calendar = style({
  width: '100%',
  display: 'flex',
  gap: 0,
});

export const weekday = style({
  width: '34px',
  paddingLeft: '5px',
  paddingRight: '5px',
});

export const emptyDay = style({
  height: '24px',
  paddingLeft: '5px',
  paddingRight: '5px',
});

export const day = recipe({
  base: {
    display: 'flex',
    color: color('font'),
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '34px',

    height: '24px',
    borderRadius: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  variants: {
    selected: {
      'corner-left': {
        backgroundColor: color('primary'),
        borderRadius: '5px 0 0 5px',
        color: color('font', 'dark'),
      },
      'corner-right': {
        backgroundColor: color('primary'),
        borderRadius: '0 5px  5px 0',
        color: color('font', 'dark'),
      },
      inside: {
        borderRadius: 0,
        backgroundColor: color('primary-disabled'),
      },
      false: { backgroundColor: 'transparent' },
    },
  },
});

export const datepicker = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});
