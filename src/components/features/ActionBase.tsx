import React, {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  RefObject,
} from 'react';
import { Loading } from './Loading';
import { ButtonType } from './Button';
import * as css from './ActionBase.css';

type Props = PropsWithChildren & {
  onClick?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
  label?: ReactNode;
  className?: string;
  startGraphic?: ReactNode;
  endGraphic?: ReactNode;
  loading?: boolean;
  type?: ButtonType;
  ref?:
    | ((node: HTMLButtonElement | null) => void)
    | RefObject<HTMLButtonElement>;
};

export const ActionBase = ({
  style,
  className,
  children,
  onBlur,
  onClick,
  disabled,
  label,
  startGraphic,
  endGraphic,
  loading,
  ref,
  type = 'button',
}: Props) => (
  <button
    className={`${css.button({ disabled })} ${className}`}
    onClick={onClick}
    type={type}
    disabled={disabled}
    onBlur={onBlur}
    style={style}
    ref={ref}
  >
    {loading ? (
      <Loading />
    ) : (
      <>
        {startGraphic}
        {label || children}
        {endGraphic}
      </>
    )}
  </button>
);
