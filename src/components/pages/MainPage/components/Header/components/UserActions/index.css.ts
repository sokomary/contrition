import { globalStyle, style } from '@vanilla-extract/css';
import { color } from 'src/theme';

export const container = style({
  width: '100%',
  height: '58px',
  padding: '0 15px',
  gap: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: color('accent-light'),
  alignItems: 'center',
  borderRadius: 'inherit',
});

globalStyle(container, {
  containerType: 'inline-size',
});

export const name = style({
  alignSelf: 'center',
  fontSize: '16px',
  paddingLeft: '5px',
});

export const photo = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const content = style({
  display: 'flex',
  gap: '10px',
});

export const image = style({
  height: '30px',
  width: '30px',
  borderRadius: '15px',
  backgroundColor: color('background'),
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
