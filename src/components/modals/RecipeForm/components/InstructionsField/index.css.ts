import { style } from '@vanilla-extract/css';
import { color, MEDIA, px } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(10),
  width: '100%',
  maxHeight: 'fit-content',

  '@media': {
    [MEDIA.ipadv]: {
      width: '100%',
      maxHeight: px(430),
    },
    [MEDIA.ipadh]: {
      maxHeight: px(320),
      width: '35%',
    },
    [MEDIA.mac]: {
      maxHeight: px(566),
    },
  },
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  fontSize: px(16),
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(30),
  justifyContent: 'space-between',
  background: color('background'),
  boxShadow: `0 0 ${px(15)} ${px(5)} rgba(8, 8, 8, 0.07)`,
  minHeight: px(42),
  borderRadius: px(10),
  padding: px(15),
  overflowY: 'auto',

  '@media': {
    [MEDIA.ipadh]: {
      minHeight: px(34),
    },
  },
});

export const emptyState = style({
  color: color('label'),
});
