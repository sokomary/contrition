import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, ActionBar, Dialog } from 'src/components/features';
import { ImageField } from './components/ImageField';
import { InstructionsField } from './components/InstructionsField';
import { ProductsField } from './components/ProductsField';
import { TagsField } from './components/TagsField';
import { useLogic, Options } from './useLogic';
import * as css from './index.css';

export const Form = (props: Options) => {
  const { t } = useTranslation();
  const {
    defaultValues,
    actions,
    register,
    control,
    errors,
    onSubmit,
    isOpen,
    onClose,
    title,
  } = useLogic(props);

  return (
    <Suspense>
      <Dialog size='large' header={title} isActive={isOpen} onClose={onClose}>
        <form onSubmit={onSubmit} className={css.container}>
          <div className={css.content}>
            <div className={css.basicFields}>
              <div className={css.rowFields}>
                <Field
                  name='name'
                  register={register}
                  label={t('domain.recipe.name')}
                  error={errors.name}
                />
                <Field
                  name='link'
                  register={register}
                  label={t('domain.recipe.link')}
                  error={errors.link}
                />
              </div>
              <div className={css.rowFields}>
                <Field
                  type='number'
                  step='0.01'
                  name='size'
                  register={register}
                  label={t('domain.recipe.size')}
                  error={errors.size}
                />
                <Field
                  name='portionSize'
                  register={register}
                  label={t('domain.recipe.portionSize')}
                  error={errors.portionSize}
                />
              </div>
              <Field
                name='comment'
                register={register}
                label={t('domain.recipe.comment')}
                error={errors.comment}
              />
              <ImageField
                name='img'
                control={control}
                defaultValue={defaultValues?.img}
                defaultUrl={defaultValues?.pressignedUrl}
              />
            </div>

            <InstructionsField control={control} register={register} />
            <ProductsField register={register} control={control} />
          </div>

          <TagsField control={control} name='tags' />
          <ActionBar actions={actions} className={css.actions} />
        </form>
      </Dialog>
    </Suspense>
  );
};
