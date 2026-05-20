import { Temporal } from 'temporal-polyfill';
import { useTranslation } from 'react-i18next';
import { useCalendar } from './useCalendar';
import { useFormat } from 'src/utils';

export type Options = {
  value: Temporal.PlainDate;
  onChange: (date: Temporal.PlainDate) => void;
  id?: string;
  disabled?: boolean;
};

export const useLogic = (props: Options) => {
  const format = useFormat();
  const { t } = useTranslation();

  const { id, value, onChange } = props;

  const isSelected = (date: Temporal.PlainDate | null) => {
    if (!date || !value) {
      return false;
    }
    return date.equals(value);
  };

  return {
    id,
    onDayClick: onChange,
    isSelected,
    title: !value
      ? t('features.datePicker.label')
      : format({
          kind: 'date',
          value: value.toString(),
        }),
    ...useCalendar(),
    disabled: props.disabled,
  };
};
