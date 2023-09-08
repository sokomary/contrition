import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { Recipe } from '../../../domain/Recipe';
import { API } from '../../../api';
import { Tag } from '../../../domain/Tag';
import { Button } from '../../ui/Button';
import { Container } from '../../ui/Container';
import i18next from '../../../i18next';

const GetRandomRecipe: FC<{ tags: Tag[]; open: boolean; onClose: () => void }> = ({ tags, open, onClose }) => {
  const [randomRecipe, setRandomRecipe] = useState<Recipe | undefined>(undefined);

  const getRandomRecipe = () => {
    API.getRandomRecipe(tags.map((t) => t.name)).then((res) => setRandomRecipe(res));
  };

  return (
    <WideDialog
      header={i18next.t('startpage:recipes.random.header')}
      visible={open}
      onHide={onClose}
    >
      <Content vertical gap={30}>
        <div>{randomRecipe?.name}</div>
        <Button onClick={getRandomRecipe}>{i18next.t('startpage:recipes.random.actions.get')}</Button>
      </Content>
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 30%;
`;

const Content = styled(Container)`
  align-items: center;
  margin: 30px 0;
`;

export { GetRandomRecipe };
