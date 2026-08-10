import { globalStyle, style } from '@vanilla-extract/css';
import { text, px, MEDIA } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(30),
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  gap: px(20),

  '@media': {
    [MEDIA.ipadv]: {
      flexDirection: 'row',
    },
  },
});

globalStyle(`${header} > div`, {
  width: '100%',
  justifyContent: 'flex-end',

  '@media': {
    [MEDIA.ipadv]: {
      width: 'unset',
    },
  },
});

export const title = style({ ...text.text3, lineHeight: '100%' });
