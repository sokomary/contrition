import { style } from '@vanilla-extract/css';
import { MEDIA, px } from 'src/theme';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: `${px(6)} ${px(15)}`,
  gap: px(15),
});

export const action = style({
  backgroundColor: 'transparent',
  height: 'fit-content',
  width: 'fit-content',
  flexShrink: 0,
  paddingInline: 0,
});

export const content = style({
  padding: '0',
  gap: px(10),
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  overflow: 'hidden',
  flex: 1,

  '@media': {
    [MEDIA.ipadv]: {
      flexDirection: 'row',
    },
  },
});
