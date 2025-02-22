import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const tooltip = style({
  backgroundColor: color('background'),
  zIndex: 150,
});

export const label = style({
  fontSize: '16px',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const button = style({
  alignSelf: 'center',
});

export const product = style({
  display: 'flex',
  justifyContent: 'space-between',
  height: '34px',
});

export const products = style({
  display: 'flex',
  gap: '5px',
  flexWrap: 'wrap',
  height: 'fit-content',
  maxWidth: '400px',
  '@media': {
    [MEDIA.ipadv]: {
      maxHeight: '115px',
      overflowY: 'scroll',
    },
    [MEDIA.ipadh]: {
      maxHeight: '248px',
      overflowY: 'scroll',
    },
  },
});

export const input = style({
  '::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  width: '65px',
  height: '34px',
  border: 'none',
  borderRadius: '25px',
  padding: '0 25px 0 5px',
  textAlign: 'center',
  outline: 'none',
  backgroundColor: color('secondary'),
  color: color('primary'),
  fontSize: '16px',
});

export const name = style({
  backgroundColor: color('accent-light'),
  color: color('accent'),
  display: 'flex',
  alignItems: 'center',
  height: '34px',
  padding: '0 20px 2px 20px',
  borderRadius: '20px',
  marginLeft: '-30px',
  cursor: 'pointer',
  maxWidth: '280px',
});

export const nameText = style({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const icon = style({
  cursor: 'pointer',
  width: '15px',
  height: '15px',
});

export const productsFieldContainer = style({
  display: 'flex',
  padding: '0 20px',
  gap: '20px',
  flexDirection: 'column',
  width: '35%',

  '@media': {
    [MEDIA.ipadv]: {
      margin: '0',
      width: '100%',
      padding: '10px',
    },
    [MEDIA.ipadh]: {
      margin: '0',
      padding: 0,
    },
    [MEDIA.iphone]: {
      margin: '0',
      width: '100%',
      padding: 0,
    },
  },
});
