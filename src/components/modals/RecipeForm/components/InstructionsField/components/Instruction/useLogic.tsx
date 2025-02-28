import { Action } from 'src/components/features';
import { Recipe } from 'src/types/domain';
import { Control, useFieldArray } from 'react-hook-form';

export type Options = {
  name: `instructions.${number}`;
  control: Control<Recipe>;
  onRemove: () => void;
};

export const useLogic = ({ name, control, onRemove }: Options) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.steps`,
  });

  const actions: Action[] = [
    {
      kind: 'ghost',
      label: 'Удалить',
      onClick: onRemove,
      size: 'small',
    },
    {
      kind: 'ghost',
      label: 'Добавить шаг',
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
