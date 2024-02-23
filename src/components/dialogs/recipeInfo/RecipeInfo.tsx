import React, {
  FC, Fragment, useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Recipe } from 'src/domain';
import {
  Container, Loading, Dialog,
} from 'src/components/features';
import {
  deleteRecipe, fromFavorites, getInstructions, toFavorites,
} from 'src/api';
import { color } from 'src/theme';
import { Link } from 'react-router-dom';
import { LinkIcon } from 'src/assets';
import { Confirmation } from 'src/components/dialogs/confirmation';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';

const RecipeInfo: FC<{ open: boolean; onClose: () => void; recipe: Recipe; onEditClick: () => void }> = ({
  open, onClose, recipe, onEditClick,
}) => {
  const { data: instructions, isLoading } = useQuery(
    `instructions-${recipe.id}`,
    () => getInstructions(recipe.id),
    { keepPreviousData: false },
  );

  const screen = useDeviceScreen();
  const getWidth = () => {
    if (['mac'].includes(screen)) {
      return 800;
    }
    if (['ipadh'].includes(screen)) {
      return 367;
    }
    return undefined;
  };
  return (
    <StyledDialog
      width={getWidth()}
      position={['iphone', 'ipadv'].includes(screen) ? 'bottom' : 'right'}
      header={(
        <Container vertical gap={7}>
          <Container gap={4}>
            <div style={{
              alignSelf: 'flex-start',
              marginTop: 3,
              fontWeight: 'medium',
              fontSize: 18,
              width: 'fit-content',
              maxWidth: 260,
            }}
            >
              {recipe.name}
            </div>
            {recipe.link.length > 1 && <LinkToRecipe to={recipe.link}><StyledLinkIcon /></LinkToRecipe>}
          </Container>
          <Container gap={4}>
            <Element bold>
              {recipe.calories.toFixed(recipe.calories % 1 > 0 ? 0 : undefined)}
            </Element>
            <Element>{recipe.protein.toFixed(recipe.protein % 1 > 0 ? 0 : undefined)}</Element>
            <Element>{recipe.fats.toFixed(recipe.fats % 1 > 0 ? 0 : undefined)}</Element>
            <Element>{recipe.carbohydrates.toFixed(recipe.carbohydrates % 1 > 0 ? 0 : undefined)}</Element>
          </Container>
        </Container>
      )}
      visible={open}
      onClose={onClose}
    >
      {!isLoading && (
        <StyledContainer vertical style={{ height: '100%' }}>
          <MainContainer gap={20}>

            <Container vertical gap={10}>
              <Title>Состав</Title>
              <Card gap={10}>
                <Container vertical gap={5}>
                  {recipe.recipeProducts.map((rp, index) => (
                    <Quantity key={index}>{rp.quantity}</Quantity>
                  ))}
                </Container>
                <Divider count={recipe.recipeProducts.length} />
                <Container vertical gap={5}>
                  {recipe.recipeProducts.map((rp, index) => (
                    <ProductName key={index}>{rp.product.name}</ProductName>
                  ))}
                </Container>
              </Card>
            </Container>

            {!!instructions?.length && (
            <Container vertical gap={10}>
              <Title>Приготовление</Title>
              <Card vertical gap={10}>
                {instructions.map((sp, index) => (
                  <Fragment key={index}>
                    <InstructionName>{sp.name}</InstructionName>
                    <Container vertical gap={12}>
                      {sp.steps.map((s, sindex) => <StepDescription key={s.id}>{`${sindex + 1}. ${s.description}`}</StepDescription>)}
                    </Container>
                  </Fragment>
                ))}
              </Card>
            </Container>
            )}
          </MainContainer>
          {screen !== 'mac' && <Actions recipe={recipe} onEditClick={onEditClick} />}
        </StyledContainer>
      )}
      {isLoading && <Loading />}
    </StyledDialog>
  );
};

const StyledContainer = styled(Container)`
  gap: 40px;
`;
const StyledDialog = styled(Dialog)`
  ${({ theme }) => theme.screen !== 'iphone' && css`
    height: 100vh;
    flex-direction: column;
  `};
`;
const LinkToRecipe = styled(Link)`
  height: 18px;
  align-self: flex-start;
  margin-top: 5px;
`;
const StyledLinkIcon = styled(LinkIcon)`
  height: 20px;
  width: 20px;
  margin-bottom: 1px;
`;
const Element = styled.div<{ bold?: boolean }>`
  background-color: ${({ theme }) => color('accent-light', theme)};
  color: ${({ theme }) => color('accent', theme)};
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  border-radius: 7px;
  height: 25px;
  padding: 0 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Actions: FC<{ recipe: Recipe; onEditClick: (recipe: Recipe) => void }> = ({ recipe, onEditClick }) => {
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

const MainContainer = styled(Container)`
  flex-direction: column;

  ${({ theme }) => theme.screen !== 'iphone' && css`
    flex-direction: column;
    gap: 24px;
  `};
`;

const ProductName = styled(Container)`
  white-space: nowrap;
  color: ${({ theme }) => color('font', theme)};
  font-size: 16px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  color:  ${({ theme }) => color('font', theme)};
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
  margin-bottom: 15px;
`;

const Quantity = styled.span`
  width: 30px;
  text-align: end;
  font-size: 16px;
  height: 19px;
  color: ${({ theme }) => color('font', theme)};
`;

const Divider = styled.div<{ count: number }>`
  width: 1px;
  background-color: ${({ theme }) => color('font', theme)};
`;

const InstructionName = styled.div`
  color: ${({ theme }) => color('accent', theme)};
  font-size: 17px;
`;

const StepDescription = styled.div`
  color:${({ theme }) => color('font', theme)};
  font-size: 16px;
`;

export { RecipeInfo };
