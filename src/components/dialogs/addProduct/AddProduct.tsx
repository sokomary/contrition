import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { addProduct } from 'src/api';
import { Product } from 'src/domain';
import {
  Container, Button, Dialog, Field,
} from 'src/components/features';
import i18next from 'src/formatter';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';

type Props = {
  open: boolean; onClose: () => void;
};

const AddProduct = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm<Product>();

  const screen = useDeviceScreen();

  const onSubmit: SubmitHandler<Product> = (data) => addMutation.mutate(data);
  return (
    <Dialog
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
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
  ${({ theme }) => theme.screen === 'iphone' && 'width: 201px;'};
`;

const NumberField = styled(Field)`
  width: 97px;
  ${({ theme }) => theme.screen === 'iphone' && ' width: 98px'};
`;

const Actions = styled(Container)`
  justify-content: flex-end;
  padding-top: 15px;
`;

export { AddProduct };
