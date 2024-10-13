import { style } from '@vanilla-extract/css';
import { MEDIA } from 'src/hooks';
import { recipe } from '@vanilla-extract/recipes';
import { color } from 'src/theme';

export const styledContainer = style({
  display: 'flex',
  gap: '5px',

  '@media': {
    [MEDIA.iphone]: {
      flexWrap: 'wrap',
    },
    [MEDIA.ipadh]: {
      flexWrap: 'wrap',
    },
    [MEDIA.ipadv]: {
      flexWrap: 'wrap',
    },
  },
});

export const tag = recipe({
  base: {
    height: '34px',
    borderRadius: '7px',
    padding: '8px 10px',
    cursor: 'pointer',
    width: 'fit-content',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: color('accent-light'),
        color: color('accent'),
      },
      false: {
        backgroundColor: color('field'),
      },
    },
  },
});

export const button = style({
  fontSize: '16px',
  color: color('primary'),
  cursor: 'pointer',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});
