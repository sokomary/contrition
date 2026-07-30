import { style } from '@vanilla-extract/css';
import { color, px } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(5),
});

export const content = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'auto',
  aspectRatio: '1 / 1',
});

export const hiddenInput = style({
  display: 'none',
});

const photo = {
  flex: 1,
  height: '100%',
  backgroundColor: color('field'),
  cursor: 'pointer',
  borderRadius: px(10),
  opacity: 30,
  flexShrink: 0,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  marginRight: 'auto',
};

export const photoInput = style(photo);

export const photoPreview = style({
  ...photo,
  backgroundRepeat: 'no-repeat',
  backgroundOrigin: 'border-box',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
});

export const label = style({
  fontSize: px(16),
});
