import React, {
  useEffect, useRef, useState,
} from 'react';
import { isEqual } from 'lodash';
import { EnterIcon, SearchIcon } from 'src/assets';
import * as css from './Dropdown.css';

type Props<T> = {
  options: { value: T; label: string }[];
  value: T[];
  onActive: () => void;
  onSelect: (value: T) => void;
};

export const Dropdown = <T = unknown>(props: Props<T>) => {
  const [value, setValue] = useState(props.value || []);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => setValue(props.value), [props.value]);

  const filteredOptions = props.options
    .filter((option) => (query.length ? option.label.toLowerCase().includes(query.toLowerCase()) : true));

  const inputRef = useRef<HTMLInputElement>(null);

  document.body.onclick = (e) => {
    const targetId = (e.target as HTMLElement).id;
    if (!targetId.includes('products-input') && !targetId.includes('option')) {
      setOpen(false);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.content({ open })}>
        <SearchIcon />
        <input
          className={css.input}
          autoComplete="off"
          id="products-input"
          ref={inputRef}
          onFocus={async () => {
            setOpen(true);
            props.onActive();
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <EnterIcon />
      </div>
      {open && (
        <div className={css.contentContainer({ open })} id="options-dropdown-container">
          {filteredOptions.length ? (
            <div className={css.options} id="options-container">
              {filteredOptions.map((o, index) => (
                <div className={css.label} key={o.label}>
                  <div
                    className={css.option({ selected: !!value.find((v) => isEqual(v, o.value)) })}
                    id={`option-${index}`}
                    onClick={() => {
                      props.onSelect(o.value);
                      inputRef.current?.focus();
                      setQuery('');
                    }}
                  >
                    {o.label}
                  </div>
                  {value.find((v) => isEqual(v, o.value)) && <div className={css.dot} />}
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
