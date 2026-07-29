import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  portionSize: number;
};

export const PortionSize = ({ portionSize }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      {t('domain.recipe.portionSize')}: {portionSize}
    </div>
  );
};
