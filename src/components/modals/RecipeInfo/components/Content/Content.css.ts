import { style } from '@vanilla-extract/css';
import { MEDIA } from 'src/hooks';
import { color } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const dialogContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  height: '100%',
  overflowY: 'scroll',
  justifyContent: 'space-between',
  padding: '0 15px 15px 15px',

  '@media': {
    [MEDIA.mac]: {
      padding: '0 20px 20px 20px',
    },
  },
});

export const mainContainer = style({
  flexDirection: 'column',
  display: 'flex',
  gap: '24px',

  '@media': {
    [MEDIA.iphone]: {
      justifyContent: 'space-between',
    },
  },
});

export const comment = style({
  borderRadius: '15px',
  backgroundColor: color('warning'),
  padding: '15px',
  width: '100%',
});

export const productName = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '16px',
});

export const title = style({
  fontWeight: '500',
  fontSize: '16px',
});

export const quantity = style({
  width: '30px',
  flexShrink: 0,
  textAlign: 'end',
  fontSize: '16px',
  height: '19px',
});

export const productsContaines = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const instructions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const instructionSteps = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const products = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const product = style({
  display: 'flex',
  gap: '5px',
});

export const divider = style({
  color: color('label'),
});

export const instructionName = style({
  color: color('accent'),
  fontSize: '17px',
});

export const stepDescription = style({
  fontSize: '16px',
});

export const card = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    flexShrink: 0,
    gap: '10px',
    padding: '20px',
    borderRadius: '20px',
    background: color('background'),
    boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  },
  variants: {
    vertical: {
      true: {
        flexDirection: 'column',
      },
    },
  },
});
