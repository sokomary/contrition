import React, { FC } from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { API } from '../../api';
import { Recipe } from '../domain/Recipe';
import i18next from '../../i18next';

const AddRecipeDialog: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const addRecipe = (values: any) => {
    API.addRecipe(values as Recipe).then(() => onClose());
  };

  return (
    <Dialog header={i18next.t('startpage:recipes.new.header')} visible={open} onHide={onClose}>
      <Form
        onSubmit={(values) => addRecipe(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Container vertical gap={15}>
              <Field name="name">
                {({ input }) => (<input type="text" {...input} placeholder="name" />)}
              </Field>
              <Field name="link">
                {({ input }) => (<input type="text" {...input} placeholder="link" />)}
              </Field>
              <Field name="calories">
                {({ input }) => (<input type="text" {...input} placeholder="calories" />)}
              </Field>
              <Field name="protein">
                {({ input }) => (<input type="text" {...input} placeholder="protein" />)}
              </Field>
              <Field name="fats">
                {({ input }) => (<input type="text" {...input} placeholder="fats" />)}
              </Field>
              <Field name="carbohydrates">
                {({ input }) => (<input type="text" {...input} placeholder="carbohydrates" />)}
              </Field>
              <Button type="submit">{i18next.t('startpage:recipes.actions.save')}</Button>
            </Container>
          </form>
        )}
      />
    </Dialog>
  );
};

const Container = styled.div<{ vertical?: boolean; gap?: number }>`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
  ${(props) => (props.gap ? `gap: ${props.gap}px;` : 'justify-content: space-between;')}
`;

export { AddRecipeDialog };
