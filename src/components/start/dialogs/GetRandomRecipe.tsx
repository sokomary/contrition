import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { isEqual } from 'lodash';
import { Recipe } from '../../../domain/Recipe';
import { API } from '../../../api';
import { Tag } from '../../../domain/Tag';
import { Button } from '../../ui/Button';
import { Container } from '../../ui/Container';
import i18next from '../../../i18next';
import { theme } from '../../ui/theme';
import { Loading } from '../../ui/Loading';

const GetRandomRecipe: FC<{ tags: Tag[]; open: boolean; onClose: () => void }> = ({ tags, open, onClose }) => {
  const [randomRecipe, setRandomRecipe] = useState<Recipe | undefined>(undefined);

  const [selectedTags, setSelectedTags] = useState(tags);
  const [loading, setLoading] = useState(false);

  const getRandomRecipe = useCallback(() => {
    setLoading(true);
    API.getRandomRecipe(selectedTags.map((t) => t.id)).then((res) => {
      setRandomRecipe(res);
      setLoading(false);
    });
  }, [selectedTags]);

  useEffect(() => {
    getRandomRecipe();
  }, [getRandomRecipe]);

  return (
    <WideDialog
      header={i18next.t('startpage:recipes.random.header')}
      visible={open}
      onHide={onClose}
    >
      <Content vertical gap={30}>
        <Container gap={5}>
          {tags.map((t, index) => (
            <TagName
              key={index}
              onClick={() => {
                if (selectedTags.find((selTag) => isEqual(selTag, t))) {
                  setSelectedTags(selectedTags.filter((selTag) => !isEqual(selTag, t)));
                } else {
                  setSelectedTags([...selectedTags, t]);
                }
              }}
              selected={!!selectedTags.find((selTag) => isEqual(selTag, t))}
            >
              {t.name}
            </TagName>
          ))}
        </Container>
        <div style={{ height: 30 }}>{!loading ? <div>{randomRecipe?.name}</div> : <Loading />}</div>
        <Button onClick={getRandomRecipe}>{i18next.t('startpage:recipes.random.actions.get')}</Button>
      </Content>
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 30%;

  @media (max-width: 700px) {
    width: 80%;
  }
`;

const Content = styled(Container)`
  align-items: center;
  margin: 30px 0;
`;

const TagName = styled.div<{ selected: boolean }>`
  color: ${theme.color.accent};
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')}
`;

export { GetRandomRecipe };
