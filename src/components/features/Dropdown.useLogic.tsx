import { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';

export type Options<T> = {
  options: { value: T; label: string }[];
  value: T[];
  onSelect: (value: T) => void;
  label: string;
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

  const onSelect = (option: { value: T; label: string }) => {
    props.onSelect(option.value);
    setQuery('');
    popoverRef.current?.hidePopover();
  };

  const isSelected = (option: { value: T; label: string }) =>
    !!value.find((v) => isEqual(v, option.value));

  return {
    query,
    setQuery,
    options: filteredOptions,
    popoverRef,
    onSelect,
    isSelected,
  };
};
