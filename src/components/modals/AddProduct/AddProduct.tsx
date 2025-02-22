import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from 'src/api';
import { Product } from 'src/types/domain';
import {
  Modal,
  Action,
  Field,
  ActionBar,
  Button,
} from 'src/components/features';
import i18next from 'src/formatter';
import { useDeviceScreen } from 'src/theme/useDeviceScreen';
import { useRouteModal } from 'src/router';
import { toast } from 'react-toastify';
import { NumberField } from './components/NumberField';
import * as css from './AddProduct.css';

export const AddProduct = () => {
  const { isOpen, onClose } = useRouteModal({
    key: 'product-new',
  });

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
      toast('Продукт успешно добавлен');
      onClose();
    },
    onError: () => toast('Что-то пошло не так'),
  });

  const { register, handleSubmit, formState, reset } = useForm<Product>();

  const screen = useDeviceScreen();

  const onSubmit: SubmitHandler<Product> = (data) => addMutation.mutate(data);

  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: i18next.t('startpage:recipes.actions.save'),
      isLoading: addMutation.isPending,
    },
  ];

  return (
    <Modal
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
      header={i18next.t('startpage:products.new.header')}
      isActive={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.content}>
          <div className={css.fields}>
            <Field
              className={css.field}
              name="name"
              register={register}
              placeholder={i18next.t('domain:recipe.name')}
              error={formState.errors.name}
              errorText={i18next.t('forms:fields.errors.required')}
              required
            />
            <NumberField
              name="calories"
              register={register}
              error={formState.errors.calories}
            />
          </div>
          <div className={css.fields}>
            {['protein', 'fats', 'carbohydrates'].map((field) => (
              <NumberField
                key={field}
                name={field}
                register={register}
                error={formState.errors.protein}
              />
            ))}
          </div>
        </div>

        <ActionBar actions={actions} />
      </form>
    </Modal>
  );
};
