import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { MEDIA, vars, px, color, text } from 'src/theme';

export const dialog = recipe({
  base: {
    position: 'fixed',
    border: 'none',
    backgroundColor: color('basic'),
    transition:
      'opacity 0.5s ease, scale 0.5s ease, margin 0.5s ease, display 0.5s ease allow-discrete, overlay 0.5s ease allow-discrete',
    boxSizing: 'border-box',
    width: '100dvw',
    maxWidth: '100%',
  },
  variants: {
    size: {
      small: {
        '@media': {
          [MEDIA.ipadv]: {
            width: px(360),
            maxWidth: '80%',
          },
        },
      },
      medium: {
        '@media': {
          [MEDIA.ipadv]: {
            width: px(500),
            maxWidth: '80%',
          },
        },
      },
      large: {
        '@media': {
          [MEDIA.ipadv]: {
            width: px(1120),
            maxWidth: '80%',
          },
        },
      },
    },
    right: {
      false: {
        inset: 0,
        maxHeight: '90%',
        marginBlockEnd: '-100dvh',
        marginInlineEnd: 0,
        marginInline: 0,
        borderRadius: `${vars['radius-05']} ${vars['radius-05']} 0 0 `,
        paddingBlockEnd: 40,

        '@media': {
          [MEDIA.ipadv]: {
            opacity: 0,
            scale: 0.5,
            margin: 'auto',
            maxHeight: '90%',
            borderRadius: vars['radius-04'],
            paddingBlockEnd: 24,
            border: `${px(0.5)} solid`,
            borderColor: color('label'),
          },
        },
      },
      true: {
        insetBlock: 0,
        insetInlineEnd: 0,
        insetInlineStart: 'auto',
        maxHeight: '100%',
        height: '100dvh',
        marginInlineEnd: '-100dvw',
        marginBlockEnd: 0,
        borderRadius: 0,
        paddingBlockEnd: 40,

        '@media': {
          [MEDIA.ipadv]: {
            paddingBlockEnd: 24,
            borderInlineStart: `${px(0.5)} solid`,
            borderColor: color('label'),
          },
        },
      },
    },
  },

  defaultVariants: {
    right: false,
  },
});

const classNames = dialog.classNames;

globalStyle(`${classNames.variants.right.false}[open]`, {
  marginBlockEnd: 0,

  '@media': {
    [MEDIA.iphone]: {
      '@starting-style': {
        marginBlockEnd: '-100dvh',
      },
    },

    [MEDIA.ipadv]: {
      opacity: 1,
      scale: 1,
      margin: 'auto',

      '@starting-style': {
        opacity: 0,
        scale: 0.5,
      },
    },
  },
});

globalStyle(`${classNames.variants.right.true}[open]`, {
  marginInlineEnd: 0,
  marginBlockEnd: 0,

  '@starting-style': {
    marginInlineEnd: '-100dvw',
    marginBlockEnd: 0,
  },
});

globalStyle(`${classNames.base}::backdrop`, {
  backgroundColor: 'transparent',
  transition:
    'background-color 0.5s ease, display 0.5s ease allow-discrete, overlay 0.5s ease allow-discrete',
});

globalStyle(`${classNames.base}[open]::backdrop`, {
  backgroundColor: color('bg-overlay'),

  '@starting-style': {
    backgroundColor: 'transparent',
  },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(15),
  alignItems: 'center',
  justifyContent: 'flex-start',
});
export const content = style({ width: '100%' });

export const header = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  ...text.header3,
  alignItems: 'center',
  gap: px(12),
});
