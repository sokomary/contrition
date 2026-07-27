import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { color, px, text } from 'src/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(24),
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(10),
});

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: px(10),
});

export const sectionTitle = style({
  ...text.text3b,
});

export const addButton = style({
  width: 'fit-content',
});

export const emptyState = style({
  ...text.text4,
  color: color('primary'),
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: px(10),
});

export const friendBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(6),
});

export const friendName = style({
  ...text.text3,
});

export const recipeRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: px(10),
  paddingLeft: px(10),
});

export const recipeName = style({
  ...text.text3,
});

export const removeButton = style({
  color: color('primary'),
});

export const cancelButton = style({
  width: 'fit-content',
});

export const actions = style({
  justifyContent: 'flex-end',
  marginBlockStart: px(20),
});

export const addForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: px(20),
});

export const label = style({
  ...text.text3,
  marginBlockEnd: px(8),
});

export const friends = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: px(5),
});

export const friend = recipe({
  base: {
    borderRadius: px(7),
    color: color('font'),
    border: '1px solid',
    width: 'fit-content',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: color('accent-light'),
        color: color('accent'),
        border: 'none',
      },
      false: {
        backgroundColor: color('field'),
        borderColor: color('primary'),
      },
    },
  },
});
