import React, {
  FC, useState,
} from 'react';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import { useQuery } from 'react-query';
import { getRandomRecipe } from 'src/api';
import { Tag } from 'src/domain';
import {
  Button, Container, Dialog,
} from 'src/components/features';
import i18next from 'src/formatter';
import { color } from 'src/theme';
import { useMediaQuery } from 'src/hooks';

const GetRandomRecipe: FC<{ tags: Tag[]; open: boolean; onClose: () => void }> = ({ tags, open, onClose }) => {
  const [selectedTags, setSelectedTags] = useState(tags);

  const { data, refetch } = useQuery(
    'random-recipe',
    () => getRandomRecipe(selectedTags.map((r) => r.id)),
  );

  const isMobile = useMediaQuery('(max-width: 740px)');

  return (
    <Dialog
      position={isMobile ? 'bottom' : undefined}
      width={!isMobile ? 350 : undefined}
      header={i18next.t('startpage:recipes.random.header')}
      visible={open}
      onClose={onClose}
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
        <RandomName><div>{data?.name}</div></RandomName>
        <Button onClick={refetch}>{i18next.t('startpage:recipes.random.actions.get')}</Button>
      </Content>
    </Dialog>
  );
};

const Content = styled(Container)`
  align-items: center;
  margin: 30px 0;
`;

const TagName = styled.div<{ selected: boolean }>`
  color: ${({ theme }) => color('accent', theme)};
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')}
`;

const RandomName = styled.div`
  height: 30px;
  color: ${({ theme }) => color('font', theme)};
`;

export { GetRandomRecipe };
