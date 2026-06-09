import { globalStyle, style } from '@vanilla-extract/css';
import { color, MEDIA, px } from 'src/theme';

export const container = style({
  display: 'flex',
  gap: px(20),
  flexDirection: 'column',
  margin: '0',
  width: '100%',

  '@media': {
    [MEDIA.ipadh]: {
      width: '35%',
    },
  },
});

export const tooltip = style({
  backgroundColor: color('background'),
  zIndex: 150,
});

export const label = style({
  fontSize: px(16),
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(10),
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const product = style({
  display: 'flex',
  justifyContent: 'space-between',
  height: px(34),
});

export const products = style({
  display: 'flex',
  gap: px(5),
  flexWrap: 'wrap',
  height: 'fit-content',
  maxWidth: px(400),
});

export const input = style({
  '::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  width: px(80),
  height: px(34),
  border: 'none',
  borderRadius: px(25),
  padding: `0 ${px(25)} 0 ${px(5)}`,
  textAlign: 'center',
  outline: 'none',
  backgroundColor: color('secondary'),
  color: color('primary'),
  fontSize: px(16),
});

export const name = style({
  backgroundColor: color('accent-light'),
  color: color('accent'),
  display: 'flex',
  alignItems: 'center',
  height: px(34),
  padding: `0 ${px(20)} ${px(2)} ${px(20)}`,
  borderRadius: px(20),
  marginLeft: px(-30),
  cursor: 'pointer',
  maxWidth: px(280),
});
globalStyle(`${name} > div`, {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const icon = style({
  cursor: 'pointer',
  width: px(15),
  height: px(15),
});
