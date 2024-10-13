import { style } from '@vanilla-extract/css';
import { color } from 'src/theme';
import { MEDIA } from 'src/hooks';

export const addStepButton = style({
  cursor: 'pointer',
  fontWeight: 'normal',
  color: color('primary'),
  fontSize: '16px',
  flexShrink: 0,
  alignSelf: 'flex-start',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const instructionHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  fontSize: '16px',
});

export const stepContainer = style({
  display: 'flex',
  gap: '3px',
  borderRadius: '5px',
  padding: '5px 0',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const steps = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});

export const step = style({
  display: 'flex',
  gap: '1px',
  alignItems: 'center',
});

export const stepNumber = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '6px',
  marginRight: '3px',
  fontSize: '16px',
});

export const styledInput = style({
  backgroundColor: color('background'),
  outline: 'none',
  border: 'none',
  resize: 'none',
  fontSize: '16px',
  // eslint-disable-next-line max-len
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n  sans-serif",
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
