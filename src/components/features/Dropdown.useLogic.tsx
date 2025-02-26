import { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';

export type Options<T> = {
  options: { value: T; label: string }[];
  value: T[];
  onSelect: (value: T) => void;
};

export const useLogic = <T = unknown,>(props: Options<T>) => {
  const [value, setValue] = useState(props.value || []);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => setValue(props.value), [props.value]);

  const filteredOptions = props.options.filter((option) =>
    query.length
      ? option.label.toLowerCase().includes(query.toLowerCase())
      : true
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSelect = (option: { value: T; label: string }) => {
    props.onSelect(option.value);
    setQuery('');
    setOpen(false);
  };

  const isSelected = (option: { value: T; label: string }) =>
    !!value.find((v) => isEqual(v, option.value));

  return {
    open,
    setOpen,
    query,
    setQuery,
    options: filteredOptions,
    dropdownRef,
    inputRef,
    onSelect,
    isSelected,
  };
};
