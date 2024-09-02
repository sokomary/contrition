import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { Recipe } from 'src/domain';
import { deleteRecipe, fromFavorites, toFavorites } from 'src/api';
import { Confirmation } from 'src/components/dialogs/Confirmation';
import { color } from 'src/theme';
import { Container } from 'src/components/features';

type Props = {
  recipe: Recipe;
  onEditClick: (recipe: Recipe) => void;
};

export const Actions = ({ recipe, onEditClick }: Props) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });
  const toFavoritesMutation = useMutation({
    mutationFn: toFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
  const fromFavoritesMutation = useMutation({
    mutationFn: fromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });

  return (
    <Dots
      key={recipe.id}
      tabIndex={0}
      gap={2}
      onClick={() => setOptionsOpen(true)}
      onBlur={() => {
        if (!confirmOpen) {
          setOptionsOpen(false);
        }
      }}
    >
      <Dot />
      <Dot />
      <Dot />
      {optionsOpen && (
        <Options>
          {confirmOpen && (
            <Confirmation
              key={recipe.id}
              open={confirmOpen}
              title="Удаление рецепта"
              text="Вы уверены, что хотите удалить рецепт?"
              onClose={(result) => {
                if (result) {
                  deleteMutation.mutate(recipe);
                  setOptionsOpen(false);
                }
                setConfirmOpen(false);
              }}
            />
          )}
          <Option onClick={() => onEditClick(recipe)}>Изменить</Option>
          {recipe.favorite
            ? <Option onClick={() => fromFavoritesMutation.mutate(recipe.id)}>Из избранного</Option>
            : <Option onClick={() => toFavoritesMutation.mutate(recipe.id)}>В избранное</Option>}
          <Option negative onClick={() => setConfirmOpen(true)}>Удалить</Option>
        </Options>
      )}
    </Dots>
  );
};

const Dot = styled.div`
  height: 4px;
  width: 4px;
  border-radius:  2px;
  flex-shrink: 0;
  background-color: ${({ theme }) => color('primary', theme)};
`;

const Dots = styled(Container)`
  cursor: pointer;
  align-self: flex-start;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  border-radius: 5px;
`;

const Options = styled(Container)`
  position: absolute;
  border-radius: 5px;
  background: #FFF;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  right: 10px;
  top: -50px;
`;

const Option = styled.div<{ negative?: boolean }>`
  width: 105px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 4px;
  color: ${({ theme, negative }) => (negative ? color('danger', theme) : '')};
  &:hover {
    color: ${({ theme }) => color('primary', theme)};
  }
`;
