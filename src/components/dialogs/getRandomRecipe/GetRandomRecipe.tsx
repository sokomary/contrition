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

const GetRandomRecipe: FC<{ tags: Tag[]; open: boolean; onClose: () => void }> = ({ tags, open, onClose }) => {
  const [selectedTags, setSelectedTags] = useState(tags);

  const { data, refetch } = useQuery(
    'random-recipe',
    () => getRandomRecipe(selectedTags.map((r) => r.id)),
  );

  return (
    <Dialog
      width={350}
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
        <div style={{ height: 30, color: color('font') }}><div>{data?.name}</div></div>
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
  color: ${color('accent')};
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')}
`;

export { GetRandomRecipe };
