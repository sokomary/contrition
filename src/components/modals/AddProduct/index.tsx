import React from 'react';
import { Modal, Field, ActionBar } from 'src/components/features';
import i18next from 'src/formatter';
import { NumberField } from './components/NumberField';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const AddProduct = () => {
  const { isOpen, onClose, screen, errors, submit, register, actions } =
    useLogic();

  return (
    <Modal
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
      header={i18next.t('startpage:products.new.header')}
      isActive={isOpen}
      onClose={onClose}
    >
      <form onSubmit={submit}>
        <div className={css.content}>
          <div className={css.fields}>
            <Field
              className={css.field}
              name="name"
              register={register}
              placeholder={i18next.t('domain:recipe.name')}
              error={errors.name}
              errorText={i18next.t('forms:fields.errors.required')}
              required
            />
            <NumberField
              name="calories"
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

        <ActionBar actions={actions} />
      </form>
    </Modal>
  );
};
