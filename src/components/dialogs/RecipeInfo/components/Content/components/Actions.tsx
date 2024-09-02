import React, { useState } from 'react';
import { Recipe } from 'src/domain';
import { useMutation, useQueryClient } from 'react-query';
import { deleteRecipe, fromFavorites, toFavorites } from 'src/api';
import { Confirmation } from 'src/components/dialogs/Confirmation';
import styled from 'styled-components';
import { color } from 'src/theme';
import { Container } from 'src/components/features';

type Props = {
  recipe: Recipe;
  onEditClick: (recipe: Recipe) => void;
};

export const Actions = ({ recipe, onEditClick }: Props) => {
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
    <ActionsCard>
      <Confirmation
        open={confirmOpen}
        title="Удаление рецепта"
        text="Вы уверены, что хотите удалить рецепт?"
        onClose={(result) => {
          if (result) {
            deleteMutation.mutate(recipe);
          }
          setConfirmOpen(false);
        }}
      />
      <ActionButton onClick={() => onEditClick(recipe)}>Изменить</ActionButton>
      {recipe.favorite
        ? <ActionButton onClick={() => fromFavoritesMutation.mutate(recipe.id)}>Из избранного</ActionButton>
        : <ActionButton onClick={() => toFavoritesMutation.mutate(recipe.id)}>В избранное</ActionButton>}
      <ActionButton onClick={() => setConfirmOpen(true)}>Удалить</ActionButton>
    </ActionsCard>
  );
};
const ActionButton = styled.div`
  color: ${({ theme }) => color('primary', theme)};
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
`;

const Card = styled(Container)`
  display: flex;
  flex-shrink: 0;
  padding: 20px;
  border-radius: 20px;
  background: ${({ theme }) => color('background', theme)};
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
`;

const ActionsCard = styled(Card)`
  padding: 5px 15px;
`;
