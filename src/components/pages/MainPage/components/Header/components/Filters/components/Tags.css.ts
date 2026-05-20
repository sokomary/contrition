import { style } from '@vanilla-extract/css';
import { color, MEDIA, px } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: px(10),
  alignItems: 'center',
  fontSize: px(18),
  color: color('primary'),
  backgroundColor: color('background'),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  padding: `${px(3)} ${px(5)}`,
  borderRadius: px(10),

  '@media': {
    [MEDIA.ipadh]: {
      padding: px(8),
      borderRadius: px(15),
    },
  },
});

export const tag = recipe({
  base: {
    fontWeight: 'normal',
    borderRadius: px(25),
    alignSelf: 'center',
    fontSize: px(18),
    cursor: 'pointer',
    color: color('primary'),
    padding: `0 ${px(5)}`,

    '@media': {
      [MEDIA.ipadv]: {
        padding: `${px(3)} ${px(10)}`,
      },
    },
  },
  variants: {
    selected: {
      true: {
        fontWeight: 'bold',
      },
    },
  },
});
