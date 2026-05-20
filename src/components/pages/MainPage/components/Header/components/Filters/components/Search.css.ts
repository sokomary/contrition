import { style } from '@vanilla-extract/css';
import { color, MEDIA, px } from 'src/theme';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  flex: 1,
});

export const input = style({
  height: px(30),
  borderRadius: px(10),
  outline: 'none',
  border: 'none',
  padding: `0 ${px(15)}`,
  alignSelf: 'center',
  fontSize: px(16),
  width: '100%',
  backgroundColor: color('field'),
  color: color('label'),

  '@media': {
    [MEDIA.ipadv]: {
      height: px(42),
      borderRadius: px(15),
    },
  },
});

export const icon = style({
  position: 'absolute',
  right: px(10),
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
});
