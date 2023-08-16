import React, { FC } from 'react';
import { Dialog } from 'primereact/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { API } from '../../api';
import i18next from '../../i18next';
import { Container } from '../ui/Container';
import { Field } from '../ui/form/Field';
import { Button } from '../ui/Button';
import { Product, ProductSchema } from '../../domain/Product';

const AddProductDialog: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const addProduct = (values: Product) => {
    API.addProduct({ ...values }).then(() => onClose());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit: SubmitHandler<Product> = (data) => addProduct(data);
  return (
    <WideDialog
      header={i18next.t('startpage:products.new.header')}
      visible={open}
      onHide={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container vertical gap={15}>
          {Object.entries(ProductSchema.props).filter((k) => k[0] !== 'id').map((key) => (
            <Field
              key={key[0]}
              name={key[0]}
              register={register}
              placeholder={i18next.t(`domain:recipe.${key[0]}`)}
              // @ts-ignore
              error={errors[key[0]]}
              errorText={i18next.t('forms:fields.errors.required')}
              required
            />
          ))}
          <Button type="submit">{i18next.t('startpage:recipes.actions.save')}</Button>
        </Container>
      </form>
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 30%;
`;

export { AddProductDialog };
