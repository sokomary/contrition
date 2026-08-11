import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'src/components/features';

type Language = 'en' | 'ru';

const LANGUAGES = ['en', 'ru'] as const;

const INFO = {
  en: { short: 'En', label: 'English' },
  ru: { short: 'Ru', label: 'Русский' },
} as const;

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const current = (
    LANGUAGES.includes(i18n.language as Language) ? i18n.language : 'en'
  ) as Language;

  return (
    <Dropdown
      width='fit'
      kind='primary'
      label={INFO[current].short}
      value={[current]}
      options={LANGUAGES.map((option) => ({
        value: option,
        label: INFO[option].label,
      }))}
      onSelect={async (option) => {
        await i18n.changeLanguage(option);
        localStorage.setItem('language', option);
      }}
    />
  );
};
