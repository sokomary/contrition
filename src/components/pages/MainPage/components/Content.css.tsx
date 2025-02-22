import { style } from '@vanilla-extract/css';
import { MEDIA } from 'src/theme';

export const container = style({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '10px',
  rowGap: '40px',
  paddingInline: '40px',

  '@media': {
    [MEDIA.ipadv]: {
      rowGap: '20px',
      paddingInline: '20px',
    },
    [MEDIA.ipadh]: {
      rowGap: '20px',
      paddingInline: '20px',
    },
    [MEDIA.iphone]: {
      paddingInline: '15px',
      rowGap: '20px',
    },
  },
});

export const emptyState = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    [MEDIA.mac]: {
      height: '100%',
    },
  },
});

export const fakeCard = style({
  width: '268px',

  '@media': {
    [MEDIA.ipadh]: {
      width: '268px',
    },
    [MEDIA.ipadv]: {
      width: '242px',
    },
    [MEDIA.iphone]: {
      width: '170px',
    },
  },
});
