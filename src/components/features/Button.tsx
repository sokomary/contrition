import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { StyleProps } from './StyleProps';
import * as css from './Button.css';

export type ButtonKind = 'primary' | 'accent' | 'ghost';
export type ButtonType = 'submit' | 'reset' | 'button';
export type ButtonSize = 'small' | 'regular' | 'large';

type Props = PropsWithChildren & StyleProps & {
  onClick?: () => void;
  onBlur?: () => void;
  kind?: ButtonKind;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  style?: CSSProperties;
  label?: ReactNode;
};

export const Button = ({
  style,
  className, children, onBlur, onClick, kind = 'primary', size, type, disabled, label,
}: Props) => (
  <button
    className={`${className} ${css.button({ kind, size, disabled })}`}
    onClick={onClick}
    type={type || 'button'}
    disabled={disabled}
    onBlur={onBlur}
    style={style}
  >
    {label || children}
  </button>
);
