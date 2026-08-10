import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  portionSize: number;
};

export const PortionSize = ({ portionSize }: Props) => {
  const { t } = useTranslation();

  return (
    <p>
      {t('domain.recipe.portionSize')}: {portionSize}
    </p>
  );
};
