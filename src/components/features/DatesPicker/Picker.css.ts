import { style } from '@vanilla-extract/css';
import { color, text, vars, px } from 'src/theme';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  position: 'relative',
  width: 'fit-content',
});

export const picker = style({
  maxWidth: '100%',
  boxSizing: 'border-box',
  padding: px(10),
  background: color('background'),
  borderRadius: vars['radius-03'],
  flexDirection: 'column',
  gap: px(15),
  boxShadow: `0 0 ${px(20)}  ${px(5)} rgba(8, 8, 8, 0.10)`,
  display: 'flex',

  '@media': {
    '(prefers-color-scheme: light)': {
      border: `${px(0.5)} solid`,
      borderColor: color('label'),
    },
  },
});

export const header = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const control = style({
  display: 'flex',
  alignItems: 'center',
  gap: px(5),
});

export const month = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
});

export const weekday = style({
  width: px(44),
  paddingInline: px(5),
  paddingBlockEnd: px(5),
  boxSizing: 'border-box',
  textAlign: 'center',
});

export const emptyDay = style({
  height: px(34),
  paddingInlineStart: px(5),
  paddingInlineEnd: px(5),
});

export const day = recipe({
  base: {
    justifyContent: 'center',
    width: px(44),
    height: `${px(34)}`,
    borderRadius: vars['radius-01'],
    color: color('font'),
    ...text.text2,
  },
  variants: {
    outlined: {
      true: {
        border: `${px(1)} solid`,
        borderColor: color('primary'),
      },
      false: {
        border: 'none',
      },
    },
    filled: {
      'corner-left': {
        borderRadius: `${vars['radius-01']} 0 0 ${vars['radius-01']}`,
        background: color('primary'),
        color: color('font', 'dark'),
      },
      'corner-right': {
        borderRadius: `0 ${vars['radius-01']} ${vars['radius-01']} 0`,
        background: color('primary'),
        color: color('font', 'dark'),
      },
      inside: {
        borderRadius: `0`,
        background: color('primary'),
        color: color('font', 'dark'),
      },
      false: { background: 'transparent' },
      true: {
        background: color('primary'),
        color: color('font', 'dark'),
      },
    },
  },
});

export const button = style({
  ...text.text2,
  background: color('field'),
  paddingInline: px(8),
  paddingBlock: px(6),
  border: 'none',
  borderRadius: vars['radius-03'],

  selectors: {
    '&:hover': {
      background: color('primary-disabled'),
    },
  },
});
