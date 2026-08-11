import { ReactNode, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { ButtonKind } from './Button';

export const SEARCHABLE_FROM = 5;

export type DropdownOption<T> = {
  value: T;
  label: string;
  startGraphic?: ReactNode;
};

export type Options<T> = {
  options: DropdownOption<T>[];
  value: T[];
  onSelect: (value: T) => void;
  label: ReactNode;
  width?: 'fit' | 'full';
  kind?: ButtonKind;
};

export const useLogic = <T = unknown>(props: Options<T>) => {
  const [value, setValue] = useState(props.value || []);
  const [query, setQuery] = useState('');

  useEffect(() => setValue(props.value), [props.value]);

  const filteredOptions = props.options.filter((option) =>
    query.length
      ? option.label.toLowerCase().includes(query.toLowerCase())
      : true,
  );

  const popoverRef = useRef<HTMLDivElement>(null);

  const onSelect = (option: DropdownOption<T>) => {
    props.onSelect(option.value);
    setQuery('');
    popoverRef.current?.hidePopover();
  };

  const isSelected = (option: DropdownOption<T>) =>
    !!value.find((v) => isEqual(v, option.value));

  return {
    query,
    setQuery,
    options: filteredOptions,
    searchable: props.options.length > SEARCHABLE_FROM,
    popoverRef,
    onSelect,
    isSelected,
  };
};
