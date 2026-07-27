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
              <Field
                name='name'
                register={register}
                label={t('domain.recipe.name')}
                error={errors.name}
                errorText={t('forms.fields.errors.required')}
                required
              />
              <div className={css.linkWeightFields}>
                <Field
                  name='link'
                  className={css.linkField}
                  register={register}
                  label={t('domain.recipe.link')}
                  error={errors.link}
                  errorText={t('forms.fields.errors.required')}
                />
                <Field
                  className={css.numberField}
                  type='number'
                  step='0.01'
                  name='size'
                  register={register}
                  label={t('domain.recipe.size')}
                  error={errors.size}
                  errorText={t('forms.fields.errors.required')}
                  required
                />
              </div>
              <Field
                name='comment'
                register={register}
                label={t('domain.recipe.comment')}
                error={errors.comment}
                errorText={t('forms.fields.errors.required')}
              />
              <Field
                required
                name='portionSize'
                register={register}
                label={t('domain.recipe.portionSize')}
                error={errors.portionSize}
                errorText={t('forms.fields.errors.required')}
              />
              <ImageField
                name='img'
                control={control}
                defaultValue={defaultValues?.img}
                defaultUrl={defaultValues?.pressignedUrl}
              />
            </div>

            <div className={css.interactiveFields}>
              <InstructionsField control={control} register={register} />
              <ProductsField register={register} control={control} />
            </div>
          </div>

          <TagsField control={control} name='tags' />
          <ActionBar actions={actions} className={css.actions} />
        </form>
      </Dialog>
    </Suspense>
  );
};
