import { style } from '@vanilla-extract/css';
import { color, text } from 'src/theme';

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
  width: '75px',
  paddingTop: '5px',
});

export const kindLabel = style({
  ...text.text3b,
  textAlign: 'center',
});

export const table = style({
  boxShadow: '0 0 20px 5px rgba(8, 8, 8, 0.10)',
  borderRadius: '15px',
  padding: '10px 15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
});

export const products = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const title = style({ ...text.text3b, lineHeight: '100%' });

export const actions = style({
  paddingTop: 0,
});
