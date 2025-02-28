import { Control, useController, useFieldArray } from 'react-hook-form';
import { Product, Recipe } from 'src/types/domain';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from 'src/api';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { useToggleModal } from 'src/components/modals';
import { find } from 'lodash';
import { Action } from 'src/components/features';
import i18next from 'src/formatter';

export type Options = {
  control: Control<Recipe>;
  register: UseFormRegister<Recipe>;
};

export const useLogic = (props: Options) => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  const { fieldState } = useController({
    control: props.control,
    name: 'recipeProducts',
  });

  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: 'recipeProducts',
    rules: {
      validate: (list) => (list as any[]).length !== 0,
    },
  });

  const options = products?.map((product) => ({
    value: product,
    label: product.name,
  }));

  const { open: openAddProduct } = useToggleModal('product-new', 'true');

  const actions: Action[] = [
    {
      kind: 'ghost',
      onClick: openAddProduct,
      label: i18next.t('startpage:recipes.actions.addProduct'),
    },
  ];

  return {
    error: fieldState.error,
    fields,
    append,
    remove,
    options,
    actions,
    value: fields.map((rp) => rp.product),
    onSelect: (product: Product) =>
      !find(fields, { product }) &&
      append({
        id: undefined as unknown as number,
        product,
        quantity: undefined as unknown as number,
      }),
  };
};
