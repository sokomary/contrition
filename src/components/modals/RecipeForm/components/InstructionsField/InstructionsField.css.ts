import { style } from '@vanilla-extract/css';
import { color, MEDIA } from 'src/theme';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',

  width: '100%',
  fontSize: '16px',
});

export const addInstructionButton = style({
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'normal',
  alignSelf: 'flex-start',
  color: color('primary'),
});

export const instructionName = style({
  marginLeft: '-8px',

  backgroundColor: color('background'),
  outline: 'none',
  border: 'none',
  resize: 'none',
  fontSize: '16px',
  fontFamily:
    // eslint-disable-next-line max-len
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n  sans-serif",
  padding: '6px',
  maxWidth: '180px',

  selectors: {
    '&:focus': {
      backgroundColor: color('field'),
      borderRadius: '6px',
    },
  },
  '@media': {
    [MEDIA.ipadv]: {
      maxWidth: '300px',
    },
  },
});

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  maxHeight: 'fit-content',

  '@media': {
    [MEDIA.ipadv]: {
      width: '100%',
      maxHeight: '430px',
    },
    [MEDIA.ipadh]: {
      maxHeight: '320px',
      width: '35%',
    },
    [MEDIA.mac]: {
      maxHeight: '566px',
    },
  },
});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  justifyContent: 'space-between',
  background: color('background'),
  boxShadow: '0 0 15px 5px rgba(8, 8, 8, 0.07)',
  minHeight: '42px',
  borderRadius: '10px',
  padding: '15px',
  overflowY: 'auto',

  '@media': {
    [MEDIA.ipadh]: {
      minHeight: '34px',
    },
  },
});
