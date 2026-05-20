import { Temporal } from 'temporal-polyfill';
import { useTranslation } from 'react-i18next';
import { useCalendar } from './useCalendar';
import { Period } from 'src/types';
import { compare } from './helpers';
import { useFormat } from 'src/utils';

export type Options = {
  value?: Period;
  onChange: (newPeriod: Period) => void;
};

export const useLogic = ({
  value = { start: undefined, end: undefined },
  onChange,
}: Options) => {
  const format = useFormat();
  const { t } = useTranslation();

  const isSelected = (date: Temporal.PlainDate | null) => {
    if (!date || !(value.end || value.start)) {
      return false;
    }

    if (value.end && value.end.equals(date)) {
      return 'corner-right';
    }

    if (value.start && value.start.equals(date)) {
      return 'corner-left';
    }

    if (
      value.start &&
      value.end &&
      compare(value.start, date) === -1 &&
      compare(date, value.end) === -1
    ) {
      return 'inside';
    }

    return false;
  };

  const onDayClick = (date: Temporal.PlainDate) => {
    let { start } = value;
    let { end } = value;

    if (!(value.start || value.end) || (value.start && value.end)) {
      start = date;
      end = null;
    } else if (value.start) {
      if (compare(value.start, date) === -1) {
        end = date;
      } else if (compare(date, value.start) === -1) {
        end = start;
        start = date;
      }
    }
    onChange({ start, end });
  };

  return {
    onDayClick,
    isSelected,
    title:
      !value.start && !value.end
        ? t('features.periodPicker.label')
        : format({
            kind: 'period',
            value: {
              from: value.start?.toString(),
              till: value.end?.toString(),
            },
            template: 'letters',
          }),
    ...useCalendar(),
  };
};
