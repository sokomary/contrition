import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const recipe = style({
  backgroundColor: color('accent-light'),
  padding: '5px 10px',
  borderRadius: '15px',
  width: 'fit-content',
  height: 'fit-content',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const content = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5px',
});
