type ColorSchema =
  'background' |
  'dialog-background' |
  'primary' |
  'primary-disabled' |
  'favorite' |
  'secondary' |
  'font' |
  'font-disabled' |
  'accent-light' |
  'accent' |
  'label' |
  'field' |
  'danger' |
  'success';

type Theme = {
  color: {
    light: { [key in ColorSchema]: string };
    dark: { [key in ColorSchema]: string };
  };
};

export const theme: Theme = {
  color: {
    light: {
      background: 'white',
      'dialog-background': 'white',
      primary: '#FF6800',
      'primary-disabled': 'rgba(255,104,0,0.35)',
      favorite: '#FFCBCE',
      secondary: '#FEF1E6',
      font: '#040404',
      'font-disabled': 'rgba(4,4,4,0.35)',
      accent: '#9E25FF',
      'accent-light': '#F3E2FF',
      label: '#8F8A8A',
      field: 'rgba(217, 217, 217, 0.54)',
      danger: '#FF4242',
      success: '#02b92e',
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.87)',
      'dialog-background': 'rgb(42,42,42)',
      primary: '#FF6800',
      'primary-disabled': 'rgba(255,104,0,0.35)',
      favorite: 'rgb(77,44,52)',
      secondary: '#3a2100',
      font: '#a6a6a6',
      'font-disabled': 'rgba(4,4,4,0.35)',
      accent: '#9c29f8',
      'accent-light': 'rgb(66,61,86)',
      label: '#8F8A8A',
      field: 'rgb(79,79,79)',
      danger: '#FF4242',
      success: '#02b92e',
    },
  },
};

export const color = (value: ColorSchema) => {
  let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    isDark = event.matches;
  });
  return theme.color[isDark ? 'dark' : 'light'][value];
};
