import React from 'react';
import { CalendarIcon, DropRightIcon, DropLeftIcon } from 'src/assets';
import { Button } from 'src/components/features';
import { upperFirst } from 'lodash';
import { Temporal } from 'temporal-polyfill';
import { useTranslation } from 'react-i18next';
import { ActionBase } from '../ActionBase';
import { WEEKDAYS } from './constants';
import { useCalendar } from './useCalendar';
import { Callout } from '../Callout';
import * as css from './Picker.css';

type Props = Omit<ReturnType<typeof useCalendar>, 'month'> & {
  title: string;
  isSelected: (
    dt: Temporal.PlainDate,
  ) => boolean | 'inside' | 'corner-right' | 'corner-left';
  onDayClick: (day: Temporal.PlainDate) => void;
  id?: string;
  disabled?: boolean;
};

export const Picker = (props: Props) => {
  const {
    title,
    isSelected,
    monthName,
    year,
    plusMonth,
    plusYear,
    minusMonth,
    minusYear,
    onDayClick,
    days,
    today,
    id,
    disabled,
  } = props;

  const { t } = useTranslation();

  return (
    <Callout
      buttonProps={{
        id: id,
        disabled: disabled,
        startGraphic: <CalendarIcon />,
        label: title,
      }}
      content={
        <div className={css.picker}>
          <div className={css.header}>
            <div className={css.control}>
              <Button
                kind='ghost'
                startGraphic={<DropLeftIcon />}
                onClick={minusMonth}
              />
              {upperFirst(monthName)}
              <Button
                kind='ghost'
                startGraphic={<DropRightIcon />}
                onClick={plusMonth}
              />
            </div>

            <div className={css.control}>
              <Button
                kind='ghost'
                startGraphic={<DropLeftIcon />}
                onClick={minusYear}
              />
              {year}
              <Button
                kind='ghost'
                startGraphic={<DropRightIcon />}
                onClick={plusYear}
              />
            </div>
          </div>

          <div className={css.month}>
            {WEEKDAYS.map((day) => (
              <div key={day} className={css.weekday}>
                {t(`weekdays.${day}.labelShort`)}
              </div>
            ))}

            {days.map((dt, i) => {
              if (!dt) {
                return <div key={`empty-${i}`} className={css.emptyDay} />;
              }
              return (
                <ActionBase
                  onClick={() => onDayClick(dt)}
                  className={css.day({
                    filled: isSelected(dt),
                    outlined: dt.equals(today),
                  })}
                  key={dt.day}
                >
                  {dt.day}
                </ActionBase>
              );
            })}
          </div>
        </div>
      }
    />
  );
};
