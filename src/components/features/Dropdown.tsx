import React from 'react';
import { EnterIcon, SearchIcon } from 'src/assets';
import { useLogic, Options } from './Dropdown.useLogic';
import { Button } from './Button';
import * as css from './Dropdown.css';

export const Dropdown = <T = unknown,>(props: Options<T>) => {
  const {
    open,
    query,
    setOpen,
    setQuery,
    options,
    dropdownRef,
    inputRef,
    onSelect,
    isSelected,
  } = useLogic(props);

  const renderContent = () => {
    if (!options.length) {
      return <div className={css.emptyState}>Нет результатов</div>;
    }

    return options.map((o) => (
      <div className={css.label} key={o.label}>
        <Button
          kind="ghost"
          className={css.option({ selected: isSelected(o) })}
          onClick={() => onSelect(o)}
        >
          {o.label}
        </Button>
        {isSelected(o) && <div className={css.dot} />}
      </div>
    ));
  };

  return (
    <div className={css.container} ref={dropdownRef}>
      <div className={css.content({ open })}>
        <SearchIcon />
        <input
          className={css.input}
          autoComplete="off"
          ref={inputRef}
          onFocus={() => setOpen(true)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <EnterIcon />
      </div>

      {open && <div className={css.contentContainer}>{renderContent()}</div>}
    </div>
  );
};
