import { recipe } from '@vanilla-extract/recipes';
import { color, MEDIA, px } from 'src/theme';
import { globalStyle } from '@vanilla-extract/css';

// An inset overlay rather than a palette swap: it tints whichever background
// the kind already has, so one value covers every filled kind and both colour
// schemes, and it stays visually distinct from :active, which replaces the
// background outright. First entry is the fallback for engines without
// light-dark(), mirroring what theme's color() emits.
const HOVER_TINT = [
  'inset 0 0 0 999px rgba(0, 0, 0, 0.07)',
  'inset 0 0 0 999px light-dark(rgba(0, 0, 0, 0.07), rgba(255, 255, 255, 0.1))',
];

// hover: hover keeps the state off touch devices, where it would otherwise
// stick to the last tapped button.
const CAN_HOVER = '(hover: hover)';

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
    justifyContent: 'center',
    transition: 'box-shadow 120ms ease, color 120ms ease, opacity 120ms ease',
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

        '@media': {
          [CAN_HOVER]: {
            selectors: {
              '&:hover:not(:disabled)': { boxShadow: HOVER_TINT },
            },
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
          [CAN_HOVER]: {
            selectors: {
              '&:hover:not(:disabled)': { boxShadow: HOVER_TINT },
            },
          },
        },
      },
      secondary: {
        color: color('font'),
        backgroundColor: color('field'),

        selectors: {
          '&:active': {
            backgroundColor: color('background-transparent'),
          },
        },

        '@media': {
          [CAN_HOVER]: {
            selectors: {
              '&:hover:not(:disabled)': { boxShadow: HOVER_TINT },
            },
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

        // No background to tint, and padding is 0 so an overlay would hug the
        // text — fade instead, which also reads on icon-only ghost buttons.
        '@media': {
          [CAN_HOVER]: {
            selectors: {
              '&:hover:not(:disabled)': { opacity: 0.65 },
            },
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
