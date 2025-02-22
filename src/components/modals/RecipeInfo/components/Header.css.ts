import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const content = style({
  display: 'flex',
  gap: '4px',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '7px',
  padding: '0 15px 15px 15px',

  '@media': {
    [MEDIA.mac]: {
      padding: '0 20px 20px 20px',
    },
  },
});

export const link = style({
  height: '18px',
  alignSelf: 'flex-start',
  marginTop: '5px',
});

export const icon = style({
  height: '20px',
  width: '20px',
  marginBottom: '1px',
});

export const element = style({
  borderRadius: '7px',
  height: '25px',
  padding: '0 10px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  backgroundColor: color('accent-light'),
  color: color('accent'),
  fontWeight: 'bold',
});
