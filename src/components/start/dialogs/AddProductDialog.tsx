import React, { FC, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import i18next from '../../../i18next';
import { Container } from '../../ui/Container';
import { Field } from '../../ui/form/Field';
import { Button } from '../../ui/Button';
import { Product } from '../../../domain/Product';
import { addProduct } from '../../../api/api';

const AddProductDialog: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm<Product>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const onSubmit: SubmitHandler<Product> = (data) => addMutation.mutate(data);
  return (
    <WideDialog
      header={i18next.t('startpage:products.new.header')}
      visible={open}
      onHide={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container vertical gap={15}>
          <Container>
            <NameField
              name="name"
              register={register}
              placeholder={i18next.t('domain:recipe.name')}
              error={formState.errors.name}
              errorText={i18next.t('forms:fields.errors.required')}
              required
            />
            <NumberField
              type="number"
              step="0.01"
              name="calories"
              register={register}
              placeholder={i18next.t('domain:recipe.calories')}
              error={formState.errors.calories}
              errorText={i18next.t('forms:fields.errors.required')}
              required
            />
          </Container>
          <Container>
            <NumberField
              type="number"
              step="0.01"
              name="protein"
              register={register}
              placeholder={i18next.t('domain:recipe.protein')}
              error={formState.errors.protein}
              errorText={i18next.t('forms:fields.errors.required')}
              required
            />
            <NumberField
              type="number"
              step="0.01"
              name="fats"
              register={register}
              placeholder={i18next.t('domain:recipe.fats')}
              error={formState.errors.fats}
              errorText={i18next.t('forms:fields.errors.required')}
              required
            />
            <NumberField
              type="number"
              step="0.01"
              name="carbohydrates"
              register={register}
              placeholder={i18next.t('domain:recipe.carbohydrates')}
              error={formState.errors.carbohydrates}
              errorText={i18next.t('forms:fields.errors.required')}
              required
            />
          </Container>
          <Actions><Button type="submit">{i18next.t('startpage:recipes.actions.save')}</Button></Actions>
        </Container>
      </form>
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 350px;

  @media (max-width: 890px) {
    width: 90%;
  }
`;

const NameField = styled(Field)`
  width: 200px;
  @media (max-width: 890px) {
    width: 201px;
  }
`;

const NumberField = styled(Field)`
  width: 97px;
  @media (max-width: 890px) {
    width: 98px;
  }
`;

const Actions = styled(Container)`
  justify-content: flex-end;
  padding-top: 15px;
`;

export { AddProductDialog };
