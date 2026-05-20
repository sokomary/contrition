import { recipe } from '@vanilla-extract/recipes';
import { color, MEDIA, px } from 'src/theme';
import { globalStyle } from '@vanilla-extract/css';

export const button = recipe({
  base: {
    border: 'none',
    outline: 'none',
    borderRadius: px(15),
    cursor: 'pointer',
    fontSize: px(16),
    width: 'fit-content',
    minWidth: 'fit-content',
    padding: `${px(5)} ${px(15)}`,
    display: 'flex',
    alignItems: 'center',
    gap: px(7),
  },
  variants: {
    size: {
      small: {
        height: px(24),
        fontSize: px(13),
      },
      regular: {
        height: px(32),
      },
      large: {
        height: px(45),
        borderRadius: px(10),
      },
    },
    kind: {
      accent: {
        color: 'white',
        backgroundColor: color('accent'),

        selectors: {
          '&:active': {
            backgroundColor: color('accent-light'),
          },
        },
      },
      primary: {
        color: color('primary'),
        backgroundColor: color('secondary'),

        selectors: {
          '&:active': {
            backgroundColor: color('primary-disabled'),
          },
        },
        width: '100%',

        '@media': {
          [MEDIA.ipadv]: {
            width: 'fit-content',
          },
        },
      },
      ghost: {
        color: color('primary'),
        backgroundColor: 'transparent',
        padding: 0,

        selectors: {
          '&:active': {
            color: color('primary-disabled'),
          },
        },
      },
    },
    disabled: {
      true: { color: color('label') },
    },
  },
});

globalStyle(`${button.classNames.variants.size.regular} svg`, {
  height: px(24),
  width: px(24),
});
globalStyle(`${button.classNames.variants.size.large} svg`, {
  height: px(24),
  width: px(24),
});
globalStyle(`${button.classNames.variants.size.small} svg`, {
  height: px(24),
  width: px(24),
});
