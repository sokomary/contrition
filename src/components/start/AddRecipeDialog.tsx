import React, { FC } from 'react';
import { Dialog } from 'primereact/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API } from '../../api';
import { Recipe, RecipeSchema } from '../../domain/Recipe';
import i18next from '../../i18next';
import { Container } from '../ui/Container';
import { Field } from '../ui/form/Field';
import { Button } from '../ui/Button';

const AddRecipeDialog: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const addRecipe = (values: Recipe) => {
    API.addRecipe(values).then(() => onClose());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Recipe>();

  const onSubmit: SubmitHandler<Recipe> = (data) => addRecipe(data);
  return (
    <Dialog header={i18next.t('startpage:recipes.new.header')} visible={open} onHide={onClose} style={{ width: '30%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container vertical gap={15}>
          {Object.entries(RecipeSchema.props).map((key) => (
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
    </Dialog>
  );
};

export { AddRecipeDialog };
