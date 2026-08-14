import { style } from '@vanilla-extract/css';
import { color, MEDIA, px } from 'src/theme';

export const PADDING_IPHONE = 15;
export const PADDING_IPAD = 20;
export const PADDING_MAC = 40;

export const container = style({
  padding: `${px(PADDING_IPHONE)} ${px(PADDING_IPHONE)} 0 ${px(PADDING_IPHONE)}`,

  '@media': {
    [MEDIA.ipadv]: {
      padding: `${px(PADDING_IPAD)} ${px(PADDING_IPAD)} 0 ${px(PADDING_IPAD)}`,
    },
    [MEDIA.ipadh]: {
      padding: `${px(PADDING_MAC)} ${px(PADDING_MAC)} 0 ${px(PADDING_MAC)}`,
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  borderRadius: px(20),
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  backgroundColor: color('basic'),
  gap: 0,

  '@media': {
    [MEDIA.ipadh]: {
      flexDirection: 'row',
    },
  },
});
