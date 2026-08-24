import { style } from '@vanilla-extract/css';
import { color, text, px } from 'src/theme';

export const container = style({
  boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
  borderRadius: px(15),
  padding: `${px(10)} ${px(10)}`,
  display: 'flex',
  flexDirection: 'column',
  gap: px(15),
});

export const recipe = style({
  backgroundColor: color('accent-light'),
  padding: `${px(5)} ${px(10)}`,
  borderRadius: px(15),
  height: '100%',
});

export const content = style({
  display: 'grid',
  gridTemplateColumns: '0.4fr 1fr 1fr 1fr',
  columnGap: px(5),
  alignItems: 'center',
});

export const dateLabel = style({
  width: px(35),
  paddingTop: px(5),
});

export const kindLabel = style({
  ...text.text3b,
  textAlign: 'center',
});
