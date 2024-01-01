type ThemeKey = { color: any };
export const theme: ThemeKey = {
  color: {
    'background-light': 'white',
    'dialog-background-light': 'white',
    'primary-light': '#FF6800',
    'primary-disabled-light': 'rgba(255,104,0,0.35)',
    'favorite-light': '#FFCBCE',
    'secondary-light': '#FEF1E6',
    'font-light': '#040404',
    'font-disabled-light': 'rgba(4,4,4,0.35)',
    'accent-light': '#9E25FF',
    'accent-light-light': '#F3E2FF',
    'label-light': '#8F8A8A',
    'field-light': 'rgba(217, 217, 217, 0.54)',
    'danger-light': '#FF4242',
    'success-light': '#02b92e',

    'background-dark': 'rgba(0, 0, 0, 0.87)',
    'dialog-background-dark': 'rgb(42,42,42)',
    'primary-dark': '#FF6800',
    'primary-disabled-dark': 'rgba(255,104,0,0.35)',
    'favorite-dark': 'rgb(77,44,52)',
    'secondary-dark': '#3a2100',
    'font-dark': '#a6a6a6',
    'font-disabled-dark': 'rgba(4,4,4,0.35)',
    'accent-dark': '#9c29f8',
    'accent-light-dark': 'rgb(66,61,86)',
    'label-dark': '#8F8A8A',
    'field-dark': 'rgb(79,79,79)',
    'danger-dark': '#FF4242',
    'success-dark': '#02b92e',
  },
};

export const color = (value: string) => {
  let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    isDark = event.matches;
  });
  return theme.color[`${value}-${isDark ? 'dark' : 'light'}`];
};
