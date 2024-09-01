import React, {
  useState,
} from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getRandomRecipe, getTags } from 'src/api';
import {
  Button,
  Container, Dialog,
} from 'src/components/features';
import i18next from 'src/formatter';
import { color } from 'src/theme';
import { useDeviceScreen } from 'src/hooks';
import { find, isEqual } from 'lodash';

type Props = {
  open: boolean;
  onClose: () => void;
};

const GetRandomRecipe = ({ open, onClose }: Props) => {
  const { data: tags } = useQuery('tags', () => getTags());
  const [selectedTags, setSelectedTags] = useState(tags || []);

  const { data, refetch } = useQuery(
    'random-recipe',
    () => getRandomRecipe(selectedTags.map((r) => r.id)),
  );

  const screen = useDeviceScreen();

  return (
    <Dialog
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
      header={i18next.t('startpage:recipes.random.header')}
      visible={open}
      onClose={onClose}
    >
      <Content vertical gap={30}>
        <Container gap={5}>
          {tags?.map((t, index) => (
            <TagName
              key={index}
              onClick={() => {
                if (find(selectedTags, t)) {
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
        <RandomName>{data?.name}</RandomName>
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
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')}
  color: ${({ theme }) => color('accent', theme)};
  cursor: pointer;
`;

const RandomName = styled.div`
  color: ${({ theme }) => color('font', theme)};
  height: 30px;
`;

export { GetRandomRecipe };
