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
import { ClearIcon, LinkIcon } from 'src/assets';
import { Confirmation } from 'src/components/dialogs/confirmation';
import { useDeviceScreen } from 'src/hooks/useDeviceScreen';

const RecipeInfo: FC<{
  open: boolean;
  onClose: () => void;
  recipe: Recipe;
  onEditClick: () => void;
  inline?: boolean; }> = ({
  open, onClose, recipe, onEditClick, inline,
}) => {
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
    <>
      {inline ? (
        <InlineDialog>
          <DialogHeader recipe={recipe} onClose={onClose} />
          <DialogContent recipe={recipe} onEditClick={onEditClick} />
        </InlineDialog>
      ) : (
        <StyledDialog
          width={getWidth()}
          position={['iphone', 'ipadv'].includes(screen) ? 'bottom' : 'right'}
          header={(<DialogHeader recipe={recipe} />)}
          visible={open}
          onClose={onClose}
        >
          <DialogContent recipe={recipe} onEditClick={onEditClick} />
        </StyledDialog>
      )}
    </>
  );
};

const InlineDialog = styled.div`
  height: 100vh;
  width: 517px;
  ${({ theme }) => theme.screen === 'ipadh' && css`
    width: 367px;
  `};
  background-color: ${({ theme }) => color('basic', theme)};
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  color: ${({ theme }) => color('font', theme)};
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  overflow: auto;

  animation-duration:  0.6s;
  animation-name: recipeInfo;
  @keyframes recipeInfo {
    0% {
      margin-right: -400px;
    }
    100% {
      margin-right: 0;
    }
  }
`;

const DialogHeader = ({
  recipe,
  onClose,
}: { recipe: Recipe; onClose?: () => void }) => (
  <DialogHeaderContainer vertical gap={7}>
    <Container>
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
      {onClose && <ClearIcon style={{ cursor: 'pointer' }} onClick={onClose} />}
    </Container>
    <Container gap={4}>
      <Element bold>
        {recipe.calories.toFixed(recipe.calories % 1 > 0 ? 0 : undefined)}
      </Element>
      <Element>{recipe.protein.toFixed(recipe.protein % 1 > 0 ? 0 : undefined)}</Element>
      <Element>{recipe.fats.toFixed(recipe.fats % 1 > 0 ? 0 : undefined)}</Element>
      <Element>{recipe.carbohydrates.toFixed(recipe.carbohydrates % 1 > 0 ? 0 : undefined)}</Element>
    </Container>
  </DialogHeaderContainer>
);

const DialogContent = ({
  recipe,
  onEditClick,
}: { recipe: Recipe; onEditClick: () => void }) => {
  const { data: instructions, isLoading } = useQuery(
    `instructions-${recipe.id}`,
    () => getInstructions(recipe.id),
    { keepPreviousData: false },
  );
  const screen = useDeviceScreen();
  return (
    <>
      {!isLoading && (
        <DialogContentContainer vertical>
          <MainContainer gap={20}>

            <Container vertical gap={10}>
              <Title>Состав</Title>
              <Card gap={10}>
                <Container vertical gap={5}>
                  {recipe.recipeProducts.map((rp, index) => (
                    <Container key={index} gap={5}>
                      <Quantity>{rp.quantity}</Quantity>
                      <Divider>|</Divider>
                      <ProductName>{rp.product.name}</ProductName>
                    </Container>
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
          {screen !== 'mac' && (
          <Actions recipe={recipe} onEditClick={onEditClick} />
          )}
        </DialogContentContainer>
      )}
      {isLoading && <Loading />}
    </>
  );
};

const DialogHeaderContainer = styled(Container)`
  ${({ theme }) => ['mac'].includes(theme.screen) && css`
    padding: 40px 40px 0 40px;
  `};
  ${({ theme }) => ['ipadh'].includes(theme.screen) && css`
    padding: 20px 20px 0 20px;
  `};
  ${({ theme }) => theme.screen === 'ipadv' && css`
    padding: 10px 20px;
  `};
  ${({ theme }) => theme.screen === 'iphone' && css`
    padding: 0 20px;
  `};
`;

const DialogContentContainer = styled(Container)`
  gap: 20px;
  height: 100%;
  overflow-y: scroll;
  justify-content: space-between;

  ${({ theme }) => ['ipadh', 'ipadv'].includes(theme.screen) && css`
    padding: 0 20px 20px 20px;
  `};
  ${({ theme }) => ['mac'].includes(theme.screen) && css`
    padding: 0 40px 40px 40px;
  `};
  ${({ theme }) => ['iphone'].includes(theme.screen) && css`
    padding: 0 20px 20px 20px;
  `};
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
  //white-space: nowrap;
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
`;

const Quantity = styled.span`
  width: 30px;
  flex-shrink: 0;
  text-align: end;
  font-size: 16px;
  height: 19px;
  color: ${({ theme }) => color('font', theme)};
`;

const Divider = styled.div`
  color: ${({ theme }) => color('label', theme)};
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
