import React, { Fragment } from 'react';
import { CalendarIcon } from 'src/assets';
import { Button } from 'src/components/features';
import { upperFirst } from 'lodash';
import { Options, useLogic } from './PeriodPicker.useLogic';
import * as css from './PeriodPicker.css';
import { format } from '../../helpers/dates';

export const PeriodPicker = (props: Options) => {
  const {
    selected,
    datePickerRef,
    month,
    year,
    open,
    calendar,
    setOpen,
    plusMonth,
    plusYear,
    minusMonth,
    minusYear,
    onDayClick,
    value,
  } = useLogic(props);

  return (
    <div ref={datePickerRef} className={css.container}>
      <div className={css.datepicker}>
        <CalendarIcon className={css.icon} onClick={() => setOpen(!open)} />
        <div>
          {!value.start && !value.end ? (
            'Выберите период'
          ) : (
            <div>{format(value)}</div>
          )}
        </div>
      </div>
      {open && (
        <div className={css.picker}>
          <div className={css.header}>
            <div className={css.control}>
              <Button label="<" kind="ghost" onClick={minusMonth} />
              {upperFirst(month)}
              <Button label=">" kind="ghost" onClick={plusMonth} />
            </div>
            <div className={css.control}>
              <Button label="<" kind="ghost" onClick={minusYear} />
              {year}
              <Button label=">" kind="ghost" onClick={plusYear} />
            </div>
          </div>
          <div className={css.calendar}>
            {Object.keys(calendar).map((weekday) => (
              <div key={weekday}>
                <div className={css.weekday}>{weekday}</div>
                {calendar[weekday].map((dt, i) => (
                  <Fragment key={i}>
                    {dt.day < 0 ? (
                      <div className={css.emptyDay} />
                    ) : (
                      <Button
                        kind="ghost"
                        onClick={() => onDayClick(dt.day)}
                        className={css.day({ selected: selected(dt.date) })}
                        key={dt.day}
                      >
                        {dt.day}
                      </Button>
                    )}
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
