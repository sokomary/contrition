import {
  useController,
  UseControllerProps,
  useFieldArray,
} from 'react-hook-form';
import { Recipe } from 'src/types/domain';
import { useQuery } from '@tanstack/react-query';
import { getTags } from 'src/api';
import { useToggleModal } from 'src/components/modals';
import { Action } from 'src/components/features';
import i18next from 'src/formatter';

export type Options = UseControllerProps<Recipe>;

export const useLogic = (props: Options) => {
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });

  const { fieldState } = useController(props);

  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: 'tags',
    keyName: 'key',
    rules: {
      validate: (v) => (v as any[]).length !== 0,
    },
  });

  const { open: openAddTag } = useToggleModal('tag-new', 'true');

  const actions: Action[] = [
    {
      kind: 'ghost',
      onClick: openAddTag,
      label: i18next.t('startpage:recipes.actions.addTag'),
    },
  ];

  return {
    tags,
    error: fieldState.error,
    fields,
    append,
    remove,
    openAddTag,
    actions,
  };
};
