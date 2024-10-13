import React, {
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { getRandomRecipe, getTags } from 'src/api';
import {
  Action, ActionBar,
  Button, Modal,
} from 'src/components/features';
import i18next from 'src/formatter';
import { useDeviceScreen } from 'src/hooks';
import { find, isEqual } from 'lodash';
import * as css from './GetRandomRecipe.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const GetRandomRecipe = ({ open, onClose }: Props) => {
  const screen = useDeviceScreen();

  const { data: tags } = useQuery('tags', () => getTags());
  const [selectedTags, setSelectedTags] = useState(tags || []);

  const { data, refetch } = useQuery(
    'random-recipe',
    () => getRandomRecipe(selectedTags.map((r) => r.id)),
  );

  const actions: Action[] = [
    {
      kind: 'primary',
      label: i18next.t('startpage:recipes.random.actions.get'),
      onClick: refetch,
    },
  ];

  return (
    <Modal
      position={screen === 'iphone' ? 'bottom' : undefined}
      width={screen !== 'iphone' ? 350 : undefined}
      header={i18next.t('startpage:recipes.random.header')}
      isActive={open}
      onClose={onClose}
    >
      <div className={css.content}>
        <div className={css.tags}>
          {tags?.map((t, index) => (
            <Button
              kind="ghost"
              className={css.tag({ selected: !!selectedTags.find((selTag) => isEqual(selTag, t)) })}
              key={index}
              onClick={() => {
                if (find(selectedTags, t)) {
                  setSelectedTags(selectedTags.filter((selTag) => !isEqual(selTag, t)));
                } else {
                  setSelectedTags([...selectedTags, t]);
                }
              }}
            >
              {t.name}
            </Button>
          ))}
        </div>
        <div className={css.randomName}>{data?.name}</div>
      </div>
      <ActionBar actions={actions} />
    </Modal>
  );
};
