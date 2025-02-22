import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const control = style({
  display: 'flex',
  padding: '15px',
  flexDirection: 'column',
  maxHeight: '100%',
  gap: 10,
});

export const controlContent = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const controlHeader = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  color: color('label'),
});

export const controlAddButton = style({
  cursor: 'pointer',
  fontSize: '16px',
  color: color('primary'),
});

export const itemsList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
  rowGap: '10px',
  height: '100%',
  overflowY: 'auto',
  '::-webkit-scrollbar': {
    backgroundColor: 'transparent',
  },

  '@media': {
    [MEDIA.ipadh]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: 'fit-content',
      maxHeight: '100%',
      gap: '10px',
    },
  },
});

export const itemName = style({
  display: 'flex',
  height: '30px',
  borderRadius: '20px',
  padding: '2px 12px 4px 12px',
  alignItems: 'center',
  fontSize: '16px',
  color: color('font'),
  backgroundColor: color('basic'),
});

export const controlName = style({
  alignItems: 'center',
  fontSize: '16px',
  color: color('label'),
});

export const dotsDivider = style({
  width: '5px',
  height: '5px',
  borderRadius: '2.5px',
  marginTop: '2px',
  backgroundColor: color('label'),
});
