import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, ActionBar, Dialog } from 'src/components/features';
import { NumberField } from './components/NumberField';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const AddProduct = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, errors, submit, register, actions } = useLogic();

  return (
    <Dialog
      header={t('startpage.products.new.header')}
      isActive={isOpen}
      onClose={onClose}
      size='small'
    >
      <form onSubmit={submit} className={css.container}>
        <div className={css.content}>
          <div className={css.fields}>
            <Field
              className={css.field}
              name='name'
              register={register}
              placeholder={t('domain.recipe.name')}
              error={errors.name}
            />
            <NumberField
              name='calories'
              register={register}
              error={errors.calories}
            />
          </div>
          <div className={css.fields}>
            {(['protein', 'fats', 'carbohydrates'] as const).map((field) => (
              <NumberField
                key={field}
                name={field}
                register={register}
                error={errors[field]}
              />
            ))}
          </div>
        </div>

        <ActionBar actions={actions} className={css.actions} />
      </form>
    </Dialog>
  );
};
