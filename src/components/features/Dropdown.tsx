import React, { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { EnterIcon, SearchIcon } from 'src/assets';
import * as css from './Dropdown.css';

type Props<T> = {
  options: { value: T; label: string }[];
  value: T[];
  onSelect: (value: T) => void;
};

export const Dropdown = <T = unknown,>(props: Props<T>) => {
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

  return (
    <div className={css.container} ref={dropdownRef}>
      <div className={css.content({ open })}>
        <SearchIcon />
        <input
          className={css.input}
          autoComplete="off"
          ref={inputRef}
          onFocus={async () => {
            setOpen(true);
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <EnterIcon />
      </div>
      {open && (
        <div className={css.contentContainer({ open })}>
          {filteredOptions.length ? (
            <div className={css.options}>
              {filteredOptions.map((o) => (
                <div className={css.label} key={o.label}>
                  <div
                    className={css.option({
                      selected: !!value.find((v) => isEqual(v, o.value)),
                    })}
                    onClick={() => {
                      props.onSelect(o.value);
                      setQuery('');
                      setOpen(false);
                    }}
                  >
                    {o.label}
                  </div>
                  {value.find((v) => isEqual(v, o.value)) && (
                    <div className={css.dot} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={css.emptyState}>Нет результатов</div>
          )}
        </div>
      )}
    </div>
  );
};
