import React, { Suspense } from 'react';
import i18next from 'src/formatter';
import {
  Field,
  Modal,
  ActionBar,
  DialogPosition,
} from 'src/components/features';
import { ImageField } from './components/ImageField';
import { InstructionsField } from './components/InstructionsField/InstructionsField';
import { ProductsField } from './components/ProductsField';
import { TagsField } from './components/TagsField';
import { useLogic, Options } from './RecipeForm.useLogic';
import * as css from './RecipeForm.css';

const POSITIONS: Record<string, DialogPosition> = {
  mac: 'center',
  iphone: 'bottom',
  ipadv: 'top',
  ipadh: 'top',
};

export const RecipeForm = (props: Options) => {
  const {
    defaultValues,
    actions,
    register,
    handleSubmit,
    control,
    formState,
    onSubmit,
    divRef,
    screen,
    isOpen,
    onClose,
  } = useLogic(props);

  return (
    <Suspense>
      <Modal
        position={POSITIONS[screen]}
        width={1120}
        header={
          defaultValues
            ? defaultValues.name
            : i18next.t('startpage:recipes.new.header')
        }
        isActive={isOpen}
        onClose={onClose}
      >
        <div ref={divRef} style={{ height: '100%' }}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <form
            style={{ height: '100%' }}
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          >
            <div className={css.container}>
              <div className={css.content}>
                <div className={css.leftPart}>
                  <div className={css.fields}>
                    <Field
                      className={css.nameField}
                      size={screen === 'iphone' ? 'large' : undefined}
                      name="name"
                      register={register}
                      placeholder={i18next.t('domain:recipe.name')}
                      error={formState.errors.name}
                      errorText={i18next.t('forms:fields.errors.required')}
                      required
                    />
                    <div className={css.linkWeightFields}>
                      <Field
                        size={screen === 'iphone' ? 'large' : undefined}
                        className={css.linkField}
                        name="link"
                        register={register}
                        placeholder={i18next.t('domain:recipe.link')}
                        error={formState.errors.link}
                        errorText={i18next.t('forms:fields.errors.required')}
                      />
                      <Field
                        size={screen === 'iphone' ? 'large' : undefined}
                        className={css.numberField}
                        type="number"
                        step="0.01"
                        name="size"
                        register={register}
                        placeholder={i18next.t('domain:recipe.size')}
                        error={formState.errors.size}
                        errorText={i18next.t('forms:fields.errors.required')}
                        required
                      />
                    </div>
                  </div>
                  <Field
                    size={screen === 'iphone' ? 'large' : undefined}
                    className={css.linkField}
                    name="comment"
                    register={register}
                    placeholder={i18next.t('domain:recipe.comment')}
                    error={formState.errors.comment}
                    errorText={i18next.t('forms:fields.errors.required')}
                  />
                  <Field
                    size={screen === 'iphone' ? 'large' : undefined}
                    className={css.linkField}
                    required
                    name="portionSize"
                    register={register}
                    placeholder={i18next.t('domain:recipe.portionSize')}
                    error={formState.errors.portionSize}
                    errorText={i18next.t('forms:fields.errors.required')}
                  />
                  {screen === 'iphone' && (
                    <TagsField control={control} name="tags" />
                  )}
                  <ImageField
                    name="img"
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

              <div className={css.footer}>
                {screen !== 'iphone' && (
                  <TagsField control={control} name="tags" />
                )}
                <ActionBar actions={actions} />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </Suspense>
  );
};
