import { Control, useFieldArray } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Action } from 'src/components/features';
import { Recipe } from 'src/types/domain';

export type Options = {
  control: Control<Recipe>;
  register: UseFormRegister<Recipe>;
};

export const useLogic = (props: Options) => {
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: 'instructions',
  });

  const actions: Action[] = [
    {
      kind: 'ghost',
      onClick: () =>
        append({
          id: undefined as unknown as number,
          name: '',
          steps: [],
        }),
      label: 'Добавить часть',
    },
  ];

  return {
    fields,
    remove,
    actions,
  };
};
