import { style } from '@vanilla-extract/css';
import { MEDIA, px } from 'src/theme';
import { PADDING_IPAD, PADDING_IPHONE, PADDING_MAC } from '../../index.css';

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: px(20),
  paddingInline: `${px(PADDING_IPHONE)}`,
  gap: px(15),

  '@media': {
    [MEDIA.ipadv]: {
      flexDirection: 'row',
      paddingInline: `${px(PADDING_IPAD)}`,
    },
    [MEDIA.ipadh]: {
      flexDirection: 'row',
      paddingInline: `${px(PADDING_MAC)}`,
    },
  },
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: px(15),

  '@media': {
    [MEDIA.ipadh]: {
      flexDirection: 'row',
    },
  },
});
