import React, { Suspense, useRef, useState } from 'react';

import {
  useForm, SubmitHandler,
} from 'react-hook-form';
import {
  useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query';
import { addRecipe, getInstructions } from 'src/api';
import { Recipe } from 'src/domain';
import i18next from 'src/formatter';
import {
  Field, Loading, Modal, Action,
} from 'src/components/features';
import { useDeviceScreen } from 'src/hooks';
import { ImageField } from './components/ImageField';
import { InstructionsField } from './components/InstructionsField/InstructionsField';
import { ProductsField } from './components/ProductsField';
import { TagsField } from './components/TagsField';
import { AddProduct } from '../AddProduct';
import { AddTag } from '../AddTag';
import * as css from './RecipeForm.css';
import { ActionBar } from '../../features';

type Props = {
  open: boolean;
  onClose: (result?: Recipe) => void;
  defaultValues?: Recipe;
};

const POSITIONS = {
  mac: 'center',
  iphone: 'bottom',
  ipadv: 'top',
  ipadh: 'top',
} as const;

export const RecipeForm = ({
  open, onClose, defaultValues,
}: Props) => {
  const { data: instructions, isLoading: areInstructionsLoading } = useQuery(
    {
      queryKey: [`instructions-${defaultValues?.id}`],
      queryFn: () => (getInstructions(defaultValues!.id)),
      enabled: defaultValues?.id !== undefined,
    },
  );

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState,
  } = useForm<Recipe>({
    defaultValues: defaultValues
      ? { ...defaultValues, instructions }
      : {
        recipeProducts: [], tags: [], instructions: [], favorite: false,
      },
  });

  const onSubmit: SubmitHandler<Recipe> = (data) => addMutation.mutate(data);

  const divRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    divRef.current?.scroll({
      top: divRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [openNewTag, setOpenNewTag] = useState(false);

  const screen = useDeviceScreen();

  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: i18next.t('startpage:recipes.actions.save'),
    },
  ];

  return (
    <Suspense>
      <Modal
        position={POSITIONS[screen]}
        width={1120}
        header={defaultValues ? defaultValues.name : i18next.t('startpage:recipes.new.header')}
        isActive={open}
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <AddProduct
          open={openNewProduct}
          onClose={() => setOpenNewProduct(false)}
        />
        <AddTag open={openNewTag} onClose={() => setOpenNewTag(false)} />

        <div
          ref={divRef}
          style={{ height: '100%' }}
        >
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <form
            style={{ height: '100%' }}
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          >

            {!addMutation.isPending && !areInstructionsLoading ? (
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
                    {screen === 'iphone'
                      && <TagsField onNewClick={() => setOpenNewTag(true)} control={control} name="tags" />}
                    <ImageField
                      name="img"
                      control={control}
                      defaultValue={defaultValues?.img}
                      defaultUrl={defaultValues?.pressignedUrl}
                    />
                  </div>

                  <div className={css.interactiveFields}>
                    <InstructionsField control={control} register={register} />
                    <ProductsField
                      register={register}
                      onNewClick={() => setOpenNewProduct(true)}
                      onActive={scrollToBottom}
                      control={control}
                    />
                  </div>

                </div>

                <div className={css.footer}>
                  {screen !== 'iphone'
                  && <TagsField onNewClick={() => setOpenNewTag(true)} control={control} name="tags" />}
                  <ActionBar actions={actions} />
                </div>
              </div>
            ) : (<div className={css.loadingWrapper}><Loading /></div>)}
          </form>
        </div>

      </Modal>
    </Suspense>
  );
};
