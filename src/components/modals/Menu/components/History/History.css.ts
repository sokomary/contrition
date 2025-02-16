import { style } from '@vanilla-extract/css';
import { color, text } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
});

export const ccc = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const header = style(text.text3b);

export const content = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5px',
});

export const recipe = style({
  backgroundColor: color('accent-light'),
  padding: '5px 10px',
  borderRadius: '15px',
  width: 'fit-content',
  height: 'fit-content',
});
