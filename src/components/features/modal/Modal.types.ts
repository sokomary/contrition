import { ReactNode } from 'react';
import { ButtonKind, ButtonType } from '../Button';

export type DialogPosition = 'center' | 'bottom' | 'right' | 'top';

export type Action = {
  label: ReactNode;
  onClick?: () => void;
  kind?: ButtonKind;
  type?: ButtonType;
  display?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
};
