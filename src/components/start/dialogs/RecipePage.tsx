import React, {
  FC, Fragment,
} from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { useQuery } from 'react-query';
import { Recipe } from '../../../domain/Recipe';
import { Container } from '../../ui/Container';
import { color } from '../../ui/theme';
import { getInstructions } from '../../../api/api';
import { Loading } from '../../ui/Loading';

const RecipePage: FC<{ open: boolean; onClose: () => void; recipe: Recipe }> = ({ open, onClose, recipe }) => {
  const { data: instructions, isLoading } = useQuery(
    `instructions-${recipe.id}`,
    () => getInstructions(recipe.id),
    { keepPreviousData: false },
  );

  return (
    <WideDialog
      header={recipe.name}
      visible={open}
      onHide={onClose}
      headerStyle={{
        borderRadius: '20px 20px 0px 0px',
        backgroundColor: color('dialog-background'),
        color: color('font'),
      }}
      contentStyle={{
        borderRadius: '0px 0px 20px 20px',
        backgroundColor: color('dialog-background'),
        color: color('font'),
      }}
    >
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
                    <PartName>{sp.name}</PartName>
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
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 45%;

  @media (max-width: 890px) {
    width: 80%;
  }
`;

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
  background-color: ${color('label')};
`;

const PartName = styled.div`
 color: ${color('primary')};
  font-size: 17px;
`;

const StepDescription = styled.div`
 color: ${color('label')};
  font-size: 14px;
  margin-left: 30px;
`;

export { RecipePage };
