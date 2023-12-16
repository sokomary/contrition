import React, {
  FC, Fragment,
} from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { useQuery } from 'react-query';
import { Recipe } from '../../../domain/Recipe';
import { Container } from '../../ui/Container';
import { theme } from '../../ui/theme';
import { getInstructions } from '../../../api/api';
import { Loading } from '../../ui/Loading';

const RecipePage: FC<{ open: boolean; onClose: () => void; recipe: Recipe }> = ({ open, onClose, recipe }) => {
  const { data: instructions, isLoading } = useQuery(
    `instructions-${recipe.id}`,
    () => getInstructions(recipe.id),
    { keepPreviousData: false },
  );

  return (
    <WideDialog header={recipe.name} visible={open} onHide={onClose}>
      {!isLoading && (
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
                <div key={index}>{rp.product.name}</div>
              ))}
            </Container>
          </Container>
          {!!instructions?.length && (
          <>
            <Title>Приготовление</Title>
            <Container vertical gap={10}>
              {instructions.map((sp, index) => (
                <Fragment key={index}>
                  <PartName>{sp.name}</PartName>
                  <Container vertical gap={5}>
                    {sp.steps.map((s, sindex) => <StepDescription key={s.id}>{`${sindex + 1}. ${s.description}`}</StepDescription>)}
                  </Container>
                </Fragment>
              ))}
            </Container>
          </>
          )}
        </Container>
      )}
      {isLoading && <Loading />}
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 35%;

  @media (max-width: 890px) {
    width: 80%;
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
  height: calc(22px * ${({ count }) => count});
  width: 1px;
  background-color: ${theme.color.label};
`;

const PartName = styled.div`
 color: ${theme.color.primary};
  font-size: 17px;
`;

const StepDescription = styled.div`
 color: ${theme.color.label};
  font-size: 14px;
  margin-left: 30px;
`;

export { RecipePage };
