import React, { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { addProduct } from 'src/api';
import { Product } from 'src/domain';
import {
  Container, Button, Dialog, Field,
} from 'src/components/features';
import i18next from 'src/formatter';

const AddProduct: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
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
    <Dialog
      width={350}
      header={i18next.t('startpage:products.new.header')}
      visible={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container vertical gap={15}>
          <Container gap={3}>
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
          <Container gap={3}>
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
    </Dialog>
  );
};

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

export { AddProduct };
