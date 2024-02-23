type ColorSchema =
  'basic' |
  'background' |
  'background-transparent' |
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
      primary: '#FF6800',
      accent: '#9E25FF',
      danger: '#FF4242',
      success: '#02b92e',

      basic: '#FFFFFF',
      secondary: '#FEF1E6',
      'accent-light': '#F3E2FF',
      background: '#FFFFFF',
      favorite: '#FFCBCE',
      font: '#131313',
      label: '#8A8585',
      field: 'rgba(217, 217, 217, 0.8)',
      'background-transparent': 'rgba(217, 217, 217, 0.97)',

      'font-disabled': 'rgba(4,4,4,0.35)',
      'primary-disabled': 'rgba(255,104,0,0.35)',
    },
    dark: {
      primary: '#FF6800',
      accent: '#9c29f8',
      danger: '#FF4242',
      success: '#02b92e',

      basic: '#2D3237',
      secondary: '#6B2401',
      'accent-light': '#3A204E',
      background: '#16181C',
      favorite: '#461624',
      font: '#DDDDDD',
      label: '#868686',
      field: 'rgba(30, 30, 30, 0.9)',
      'background-transparent': 'rgba(30, 30, 30, 0.9)',

      'primary-disabled': 'rgba(255,104,0,0.35)',
      'font-disabled': 'rgba(4,4,4,0.35)',
    },
  },
};

export const color = (
  value: ColorSchema,
  colorTheme?: { mode: 'light' | 'dark' },
) => theme.color[colorTheme?.mode || 'light'][value];
