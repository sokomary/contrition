import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconDropDown, IconSearch } from 'src/assets';
import { useLogic, Options } from './Dropdown.useLogic';
import { Button } from './Button';
import { Callout } from './Callout';
import * as css from './Dropdown.css';

export const Dropdown = <T = unknown>(props: Options<T>) => {
  const { t } = useTranslation();
  const {
    query,
    setQuery,
    options,
    searchable,
    popoverRef,
    onSelect,
    isSelected,
  } = useLogic(props);

  const renderOptions = () => {
    if (!options.length) {
      return (
        <p className={css.emptyState}>
          {t('features.dropdown.emptyState.text')}
        </p>
      );
    }

    return (
      <div className={css.options}>
        {options.map((o) => (
          <div className={css.label} key={o.label}>
            <Button
              kind='ghost'
              className={css.option({ selected: isSelected(o) })}
              startGraphic={o.startGraphic}
              label={o.label}
              onClick={() => onSelect(o)}
            />
            {isSelected(o) && <div className={css.dot} />}
          </div>
        ))}
      </div>
    );
  };

  const fieldAppearance = !props.kind;

  return (
    <Callout
      width={props.width || 'full'}
      calloutRef={popoverRef}
      buttonProps={{
        kind: props.kind || 'ghost',
        className: fieldAppearance ? css.trigger : '',
        endGraphic: <IconDropDown />,
        label: props.label,
      }}
      content={
        <div className={css.contentContainer}>
          {searchable && (
            <div className={css.search}>
              <IconSearch />
              <input
                className={css.input}
                autoComplete='off'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          )}

          {renderOptions()}
        </div>
      }
    />
  );
};
