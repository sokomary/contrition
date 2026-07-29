import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'src/components/features';
import { Value } from './components/Value';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const ProductInfo = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, product } = useLogic();

  return (
    <Dialog
      header={product?.name}
      size='small'
      isActive={isOpen}
      onClose={onClose}
    >
      <div className={css.container}>
        <Value
          label={`${t('domain.recipe.calories')}:`}
          content={product?.calories}
        />
        <Value
          label={`${t('domain.recipe.protein')}:`}
          content={product?.protein}
        />
        <Value label={`${t('domain.recipe.fats')}:`} content={product?.fats} />
        <Value
          label={`${t('domain.recipe.carbohydrates')}:`}
          content={product?.carbohydrates}
        />
      </div>
    </Dialog>
  );
};
