import { Action } from 'src/components/features';
import { Recipe } from 'src/types/domain';
import { Control, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type Options = {
  name: `instructions.${number}`;
  control: Control<Recipe>;
  onRemove: () => void;
};

export const useLogic = ({ name, control, onRemove }: Options) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.steps`,
  });

  const actions: Action[] = [
    {
      kind: 'ghost',
      label: t('startpage.recipes.actions.delete'),
      onClick: onRemove,
      size: 'small',
    },
    {
      kind: 'ghost',
      label: t('startpage.recipes.instructions.actions.addStep'),
      onClick: () =>
        append({ id: undefined as unknown as number, description: '' }),
      size: 'small',
    },
  ];

  return {
    fields,
    remove,
    actions,
    name,
  };
};
