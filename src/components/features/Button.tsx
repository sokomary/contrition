import React, {
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  PropsWithChildren,
  ReactNode,
} from 'react';
import * as css from './Button.css';
import { Loading } from './Loading';

export type ButtonKind = 'primary' | 'accent' | 'ghost';
export type ButtonType = 'submit' | 'reset' | 'button';
export type ButtonSize = 'small' | 'regular' | 'large';

export type ButtonProps<T extends ElementType = 'button'> =
  PropsWithChildren & {
    as?: T;
    startGraphic?: ReactNode;
    endGraphic?: ReactNode;
    loading?: boolean;
    id?: string;
    onClick?: () => void;
    onBlur?: () => void;
    kind?: ButtonKind;
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    style?: CSSProperties;
    label?: ReactNode;
    className?: string;
  } & ComponentPropsWithRef<ElementType extends T ? 'a' : T>;

export const Button = <T extends ElementType = 'button'>({
  as,
  startGraphic,
  endGraphic,
  loading,
  ref,
  id,
  style,
  className,
  children,
  onBlur,
  onClick,
  kind = 'primary',
  size = 'regular',
  type = 'button',
  disabled,
  label,
  ...restProps
}: ButtonProps<T>) => {
  const Component = as || 'button';
  return (
    <Component
      {...restProps}
      ref={ref}
      id={id}
      className={`${className} ${css.button({ kind, size, disabled })}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      onBlur={onBlur}
      style={style}
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
    </Component>
  );
};
