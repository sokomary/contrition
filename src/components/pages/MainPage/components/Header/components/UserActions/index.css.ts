import { globalStyle, style } from '@vanilla-extract/css';
import { color, MEDIA, px } from 'src/theme';

export const container = style({
  width: '100%',
  height: px(60),
  padding: `0 ${px(15)}`,
  gap: px(10),
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: color('accent-light'),
  alignItems: 'center',
  borderRadius: 'inherit',
});

globalStyle(container, {
  containerType: 'inline-size',
});

export const name = style({
  display: 'none',
  alignSelf: 'center',
  fontSize: px(16),
  paddingLeft: px(5),

  '@media': {
    [MEDIA.ipadv]: {
      display: 'block',
    },
  },
});

export const photo = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const content = style({
  display: 'flex',
  gap: px(10),
});

export const image = style({
  height: px(30),
  width: px(30),
  borderRadius: px(15),
  backgroundColor: color('background'),
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
