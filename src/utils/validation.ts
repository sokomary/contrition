import { TFunction } from 'i18next';
import { z } from 'zod';

type T = TFunction<'translation'>;

const isBlank = (value: string | number | undefined) =>
  value === undefined || value === '';

export const requiredString = (t: T) =>
  z.string().min(1, t('forms.fields.errors.required'));

export const requiredEmail = (t: T) =>
  requiredString(t).pipe(z.email(t('forms.fields.errors.email')));

export const requiredNumber = (t: T) =>
  z
    .union([z.string(), z.number()])
    .refine((value) => !isBlank(value) && !Number.isNaN(Number(value)), {
      message: t('forms.fields.errors.number'),
    })
    .transform(Number);

export const optionalNumber = (t: T) =>
  z
    .union([z.string(), z.number()])
    .optional()
    .refine((value) => isBlank(value) || !Number.isNaN(Number(value)), {
      message: t('forms.fields.errors.number'),
    })
    .transform((value) => (isBlank(value) ? undefined : Number(value)));
