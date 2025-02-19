import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRandomRecipe, getTags } from 'src/api';
import { Action } from 'src/components/features';
import i18next from 'src/formatter';
import { useDeviceScreen, useRoutModal } from 'src/hooks';
import { find, isEqual } from 'lodash';
import { Tag } from 'src/types/domain';

export const useLogic = () => {
  const { isOpen, onClose } = useRoutModal({
    key: 'random-recipe',
  });

  const screen = useDeviceScreen();

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });
  const [selectedTags, setSelectedTags] = useState(tags || []);

  const { data, refetch } = useQuery({
    queryKey: ['random-recipe'],
    queryFn: () => getRandomRecipe(selectedTags.map((r) => r.id)),
  });

  const actions: Action[] = [
    {
      kind: 'primary',
      label: i18next.t('startpage:recipes.random.actions.get'),
      onClick: refetch,
    },
  ];

  return {
    isOpen,
    onClose,
    screen,
    data,
    actions,
    tags: tags || [],
    isSelected: (tag: Tag) => !!find(selectedTags, tag),
    onSelect: (tag: Tag) => {
      if (find(selectedTags, tag)) {
        setSelectedTags(selectedTags.filter((selTag) => !isEqual(selTag, tag)));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    },
  };
};
