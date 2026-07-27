export type ModalRouts = {
  menu: 'true';
  'random-recipe': 'true';
  'recipe-new': 'true';
  'recipe-edit': string;
  'product-new': 'true';
  'product-info': string;
  'recipe-info': string;
  'recipe-share': string;
  'view-sharings': 'true';
  'tag-new': 'true';
};

export const ROUTES = {
  start: '/start',
  login: '/login',
} as const;
