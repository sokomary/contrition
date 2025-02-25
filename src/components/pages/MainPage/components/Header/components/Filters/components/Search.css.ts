import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  flex: 1,
});

export const input = style({
  height: '30px',
  borderRadius: '10px',
  outline: 'none',
  border: 'none',
  padding: '0 15px',
  alignSelf: 'center',
  fontSize: '16px',
  width: '100%',
  backgroundColor: color('field'),
  color: color('label'),

  '@media': {
    [MEDIA.ipadv]: {
      height: '42px',
      borderRadius: '15px',
    },
  },
});

export const icon = style({
  position: 'absolute',
  right: '10px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
});
