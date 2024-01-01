import React, {
  FC, useState,
} from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { isEqual } from 'lodash';
import { useQuery } from 'react-query';
import { getRandomRecipe } from '../../../api/api';
import { Tag } from '../../../domain/Tag';
import { Button } from '../../ui/Button';
import { Container } from '../../ui/Container';
import i18next from '../../../i18next';
import { color } from '../../ui/theme';

const GetRandomRecipe: FC<{ tags: Tag[]; open: boolean; onClose: () => void }> = ({ tags, open, onClose }) => {
  const [selectedTags, setSelectedTags] = useState(tags);

  const { data, refetch } = useQuery(
    'random-recipe',
    () => getRandomRecipe(selectedTags.map((r) => r.id)),
  );

  return (
    <WideDialog
      headerStyle={{
        borderRadius: '20px 20px 0px 0px',
        backgroundColor: color('dialog-background'),
        color: color('font'),
      }}
      contentStyle={{ borderRadius: '0px 0px 20px 20px', backgroundColor: color('dialog-background') }}
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
        <div style={{ height: 30, color: color('font') }}><div>{data?.name}</div></div>
        <Button onClick={refetch}>{i18next.t('startpage:recipes.random.actions.get')}</Button>
      </Content>
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 30%;

  @media (max-width: 890px) {
    width: 80%;
  }
`;

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
