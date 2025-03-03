type ColorSchema =
  | 'basic'
  | 'background'
  | 'background-transparent'
  | 'primary'
  | 'primary-disabled'
  | 'favorite'
  | 'secondary'
  | 'font'
  | 'font-disabled'
  | 'accent-light'
  | 'bg-overlay'
  | 'accent'
  | 'label'
  | 'field'
  | 'danger'
  | 'error'
  | 'success'
  | 'warning';

type Theme = {
  color: {
    light: { [key in ColorSchema]: string };
    dark: { [key in ColorSchema]: string };
  };
};

export const theme: Theme = {
  color: {
    light: {
      primary: 'rgb(255, 104, 0, 1)',
      accent: 'rgb(158, 37, 255, 1)',
      danger: 'rgb(230,170,170)',
      error: 'rgb(241,75,75)',
      success: 'rgb(154, 222, 177, 1)',
      basic: 'rgb(255, 255, 255, 1)',
      secondary: 'rgb(254, 241, 230, 1)',
      'accent-light': 'rgb(243, 226, 255, 1)',
      background: 'rgb(255, 255, 255, 1)',
      favorite: 'rgb(255, 203, 206, 1)',
      font: 'rgb(19, 19, 19, 1)',
      label: 'rgb(138, 133, 133, 1)',
      field: 'rgba(217, 217, 217, 0.8)',
      'background-transparent': 'rgba(217, 217, 217, 0.97)',
      'font-disabled': 'rgba(4,4,4,0.35)',
      'primary-disabled': 'rgba(255,104,0,0.35)',
      'bg-overlay': 'rgba(142,142,142,0.82)',
      warning: 'rgba(250,183,59,0.52)',
    },
    dark: {
      primary: 'rgb(255, 104, 0, 1)',
      accent: 'rgb(158, 37, 255, 1)',
      danger: 'rgb(113,58,58)',
      error: 'rgb(241,75,75)',
      success: 'rgb(102, 137, 114, 1)',
      basic: 'rgb(45, 50, 55, 1)',
      secondary: 'rgb(107, 36, 1, 1)',
      'accent-light': 'rgb(58, 32, 78, 1)',
      background: 'rgb(22, 24, 28, 1)',
      favorite: 'rgb(70, 22, 36, 1)',
      font: 'rgb(221, 221, 221, 1)',
      label: 'rgb(134, 134, 134, 1)',
      field: 'rgba(30, 30, 30, 0.9)',
      'background-transparent': 'rgba(30, 30, 30, 0.9)',
      'primary-disabled': 'rgba(255,104,0,0.35)',
      'font-disabled': 'rgba(4,4,4,0.35)',
      'bg-overlay': 'rgba(21,21,21,0.82)',
      warning: 'rgba(165,114,53,0.62)',
    },
  },
};

export const text = {
  text3: { fontSize: '16px' },
  text3b: { fontSize: '16px', fontWeight: 600 },
  text2: { fontSize: '20px' },
  text1: { fontSize: '24px' },
  text2b: { fontSize: '20px', fontWeight: 600 },
  header3: { fontSize: '24px', fontWeight: 600 },
  header2: { fontSize: '36px', fontWeight: 600 },
  header1: { fontSize: '48px', fontWeight: 600 },
};

export const color = (value: ColorSchema, mode?: 'dark' | 'light') =>
  mode
    ? theme.color[mode][value]
    : [
        theme.color.light[value],
        `light-dark(${theme.color.light[value]}, ${theme.color.dark[value]})`,
      ];
