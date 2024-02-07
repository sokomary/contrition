import React, {
  FC, Fragment,
} from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Recipe } from 'src/domain';
import {
  Container, Loading, Dialog,
} from 'src/components/features';
import { getInstructions } from 'src/api';
import { color } from 'src/theme';

const RecipeInfo: FC<{ open: boolean; onClose: () => void; recipe: Recipe }> = ({ open, onClose, recipe }) => {
  const { data: instructions, isLoading } = useQuery(
    `instructions-${recipe.id}`,
    () => getInstructions(recipe.id),
    { keepPreviousData: false },
  );

  return (
    <Dialog width={800} header={recipe.name} visible={open} onClose={onClose}>
      {!isLoading && (
        <MainContainer gap={70}>
          <Container vertical gap={20}>
            <Title>Список продуктов</Title>
            <Container gap={5} style={{ paddingLeft: 20 }}>
              <Container vertical gap={5}>
                {recipe.recipeProducts.map((rp, index) => (
                  <Quantity key={index}>{rp.quantity}</Quantity>
                ))}
              </Container>
              <Divider count={recipe.recipeProducts.length} />
              <Container vertical gap={5}>
                {recipe.recipeProducts.map((rp, index) => (
                  <div style={{ whiteSpace: 'nowrap' }} key={index}>{rp.product.name}</div>
                ))}
              </Container>
            </Container>
          </Container>
          {!!instructions?.length && (
            <Container vertical gap={20}>
              <Title>Приготовление</Title>
              <Container vertical gap={10}>
                {instructions.map((sp, index) => (
                  <Fragment key={index}>
                    <InstructionName>{sp.name}</InstructionName>
                    <Container vertical gap={5}>
                      {sp.steps.map((s, sindex) => <StepDescription key={s.id}>{`${sindex + 1}. ${s.description}`}</StepDescription>)}
                    </Container>
                  </Fragment>
                ))}
              </Container>
            </Container>
          )}
        </MainContainer>
      )}
      {isLoading && <Loading />}
    </Dialog>
  );
};

const MainContainer = styled(Container)`
  @media (max-width: 1370px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const Title = styled.div`
  font-weight: bold;
`;

const Quantity = styled.span`
  font-weight: bold;
  width: 30px;
  text-align: end;
`;

const Divider = styled.div<{ count: number }>`
  height: 100%;
  width: 1px;
  background-color:${({ theme }) => color('label', theme)};
`;

const InstructionName = styled.div`
 color: ${({ theme }) => color('primary', theme)};
  font-size: 17px;
`;

const StepDescription = styled.div`
 color:${({ theme }) => color('label', theme)};
  font-size: 14px;
  margin-left: 30px;
`;

export { RecipeInfo };
