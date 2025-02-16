import React from 'react';
import {
  Menu,
} from 'src/components/modals';

export const ROUT_MODALS = {
  menu: ['true'],
} as const;

export const Modals = () => (
  <Menu />
);
