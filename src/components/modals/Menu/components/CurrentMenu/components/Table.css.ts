import { style } from '@vanilla-extract/css';
import { color, text } from 'src/theme';

export const container = style({
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  borderRadius: '15px',
  padding: '10px 15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
});

export const recipe = style({
  backgroundColor: color('accent-light'),
  padding: '5px 10px',
  borderRadius: '15px',
  width: 'fit-content',
  height: 'fit-content',
});

export const content = style({
  display: 'grid',
  gridTemplateColumns: '0.5fr 1fr 1fr 1fr',
  columnGap: '15px',
});

export const dateLabel = style({
  width: '35px',
  paddingTop: '5px',
});

export const kindLabel = style({
  ...text.text3b,
  textAlign: 'center',
});
