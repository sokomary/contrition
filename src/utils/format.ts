import { Temporal } from 'temporal-polyfill';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { upperFirst } from 'lodash';

export const useFormat = () => {
  const { i18n, t } = useTranslation();
  return format(i18n.language, t);
};

type DateTemplate = 'letters' | 'numeric';

type FormatDateProps = {
  kind: 'date';
  value: string;
  locale: string;
  template?: DateTemplate;
  year?: boolean;
};

type FormatPeriodProps = {
  kind: 'period';
  template?: DateTemplate;
  locale: string;
  value: { from?: string; till?: string };
  t: TFunction<'translation'>;
};

type FormatPercentProps = {
  kind: 'percent';
  value: number;
};

type FormatProps =
  | Omit<FormatDateProps, 'locale'>
  | Omit<FormatPeriodProps, 'locale' | 't'>
  | FormatPercentProps;

const buildLocaleOptions = (
  template: DateTemplate = 'letters',
  year?: boolean,
): Intl.DateTimeFormatOptions => ({
  month: template === 'letters' ? 'long' : '2-digit',
  day: template === 'letters' ? 'numeric' : '2-digit',
  year:
    year === false ? undefined : template === 'letters' ? 'numeric' : '2-digit',
});

const formatDate = ({ value, locale, template, year }: FormatDateProps) =>
  Temporal.PlainDate.from(value).toLocaleString(
    locale,
    buildLocaleOptions(template, year),
  );

const formatPeriod = ({ value, locale, template, t }: FormatPeriodProps) => {
  const options = buildLocaleOptions(template);
  const fromFormatted = value.from
    ? Temporal.PlainDate.from(value.from).toLocaleString(locale, options)
    : undefined;
  const tillFormatted = value.till
    ? Temporal.PlainDate.from(value.till).toLocaleString(locale, options)
    : undefined;

  return `${fromFormatted ? `${upperFirst(t('voc.from'))} ${fromFormatted}` : ''} ${tillFormatted ? `${t('voc.till')} ${tillFormatted}` : ''}`;
};

const formatPercent = ({ value }: FormatPercentProps) =>
  `${(value * 100).toFixed(0)}%`;

const format =
  (locale: string, t: TFunction<'translation', undefined>) =>
  (props: FormatProps) => {
    switch (props.kind) {
      case 'date':
        return formatDate({ ...props, locale });
      case 'period':
        return formatPeriod({ ...props, locale, t });
      case 'percent':
        return formatPercent(props);
      default:
        return '';
    }
  };
