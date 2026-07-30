import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconEnter, IconSearch } from 'src/assets';
import { useLogic, Options } from './Dropdown.useLogic';
import { Button } from './Button';
import * as css from './Dropdown.css';

// todo move to popover
export const Dropdown = <T = unknown>(props: Options<T>) => {
  const { t } = useTranslation();
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
      return (
        <div className={css.emptyState}>
          {t('features.dropdown.emptyState.text')}
        </div>
      );
    }

    return options.map((o) => (
      <div className={css.label} key={o.label}>
        <Button
          kind='ghost'
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
        <IconSearch />
        <input
          className={css.input}
          autoComplete='off'
          ref={inputRef}
          onFocus={() => setOpen(true)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconEnter />
      </div>

      {open && <div className={css.contentContainer}>{renderContent()}</div>}
    </div>
  );
};
