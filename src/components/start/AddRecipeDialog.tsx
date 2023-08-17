import React, { FC, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import {
  useForm, SubmitHandler,
} from 'react-hook-form';
import styled from 'styled-components';
import { API } from '../../api';
import { Recipe } from '../../domain/Recipe';
import i18next from '../../i18next';
import { Container } from '../ui/Container';
import { Field } from '../ui/form/Field';
import { Product } from '../../domain/Product';
import { AddProductDialog } from './AddProductDialog';
import { Tag } from '../../domain/Tag';
import { Button } from '../ui/Button';
import { AddTagDialog } from './AddTagDialog';
import { DropdownField } from '../ui/form/DropdownField';
import { ProductsField } from './ProductsField';

const AddRecipeDialog: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openNewProduct, setOpenNewProduct] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);
  const [openNewTag, setOpenNewTag] = useState(false);

  const addRecipe = (values: Recipe) => {
    API.addRecipe(values).then(() => onClose());
  };

  const getProducts = () => {
    API.getProducts().then((res) => setProducts(res));
  };
  useEffect(() => {
    getProducts();
  }, []);

  const getTags = () => {
    API.getTags().then((res) => setTags(res));
  };
  useEffect(() => {
    getTags();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState,
  } = useForm<Recipe>({
    defaultValues: {
      tags: [],
      recipeProducts: [],
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const onSubmit: SubmitHandler<Recipe> = (data) => {
    addRecipe(data);
  };

  return (
    <WideDialog header={i18next.t('startpage:recipes.new.header')} visible={open} onHide={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container vertical gap={30}>
          <Container vertical gap={15}>
            {['name', 'link', 'size', 'img'].map((key, inedx) => (
              <Field
                key={inedx.toString()}
                name={key}
                register={register}
                placeholder={i18next.t(`domain:recipe.${key}`)}
                // @ts-ignore
                error={formState.errors[key]}
                errorText={i18next.t('forms:fields.errors.required')}
                required
              />
            ))}

          </Container>
          <Container vertical gap={30}>
            {!!products.length && (
              <ProductsField control={control} name="recipeProducts" products={products} />
            )}
            <StartButton onClick={() => setOpenNewProduct(true)}>
              {i18next.t('startpage:recipes.actions.addProduct')}
            </StartButton>
            <Container>
              <DropdownField
                label={i18next.t('domain:recipe.tags')}
                control={control}
                name="tags"
                rules={{ required: true }}
                options={tags.map((t) => ({ value: t, label: t.name }))}
              />
              <EndButton onClick={() => setOpenNewTag(true)}>
                {i18next.t('startpage:recipes.actions.addTag')}
              </EndButton>
            </Container>
            <Button type="submit">{i18next.t('startpage:recipes.actions.save')}</Button>
          </Container>
        </Container>
      </form>
      <AddTagDialog
        open={openNewTag}
        onClose={() => {
          setOpenNewTag(false);
          getTags();
        }}
      />
      <AddProductDialog
        open={openNewProduct}
        onClose={() => {
          setOpenNewProduct(false);
          getProducts();
        }}
      />
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 40%;
`;

const StartButton = styled(Button)`
  align-self: flex-start;
`;

const EndButton = styled(Button)`
  align-self: flex-end;
`;

export { AddRecipeDialog };
