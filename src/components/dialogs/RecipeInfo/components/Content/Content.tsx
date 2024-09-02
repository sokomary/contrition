import { useQuery } from 'react-query';
import { Recipe } from 'src/domain';
import { getInstructions } from 'src/api';
import { useDeviceScreen } from 'src/hooks';
import { Container, Loading } from 'src/components/features';
import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { color } from 'src/theme';
import { Actions } from './components/Actions';

export const Content = ({
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

const MainContainer = styled(Container)`
  flex-direction: column;

  ${({ theme }) => theme.screen !== 'iphone' && css`
    flex-direction: column;
    gap: 24px;
  `};
`;

const ProductName = styled(Container)`
  color: ${({ theme }) => color('font', theme)};
  font-size: 16px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  color:  ${({ theme }) => color('font', theme)};
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

const Card = styled(Container)`
  display: flex;
  flex-shrink: 0;
  padding: 20px;
  border-radius: 20px;
  background: ${({ theme }) => color('background', theme)};
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
`;
