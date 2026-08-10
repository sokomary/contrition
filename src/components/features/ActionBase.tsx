import React, {
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { Loading } from './Loading';
import { ButtonType } from './Button';
import * as css from './ActionBase.css';

export type ActionBaseProps<T extends ElementType = 'button'> =
  PropsWithChildren & {
    as?: T;
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
  } & ComponentPropsWithRef<ElementType extends T ? 'a' : T>;

export const ActionBase = <T extends ElementType = 'button'>({
  as,
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
  ...restProps
}: ActionBaseProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      {...restProps}
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
    </Component>
  );
};
