import React, {
  FC, useRef,
} from 'react';

import {
  useForm, SubmitHandler,
} from 'react-hook-form';
import styled from 'styled-components';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { addRecipe, getInstructions, getProducts } from 'src/api';
import { Recipe, Tag } from 'src/domain';
import i18next from 'src/formatter';
import {
  Container, Field, Button, Loading, Dialog,
} from 'src/components/features';
import { ImageField } from './components/ImageField';
import { InstructionsField } from './components/InstructionsField';
import { ProductsField } from './components/ProductsField';
import { TagsField } from './components/TagsField';

const AddRecipe: FC<{
  tags: Tag[]; open: boolean; onClose: (result?: Recipe) => void; defaultValues?: Recipe;
}> = ({
  tags, open, onClose, defaultValues,
}) => {
  const { data: products } = useQuery('products', () => getProducts());
  const { data: instructions, isLoading: areInstructionsLoading } = useQuery(
    `instructions-${defaultValues?.id}`,
    () => getInstructions(defaultValues!.id),
    { enabled: defaultValues?.id !== undefined, suspense: true },
  );

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState,
    setValue,
  } = useForm<Recipe>({
    defaultValues: defaultValues
      ? { ...defaultValues, instructions }
      : {
        recipeProducts: [], tags: [], instructions: [], favorite: false,
      },
  });

  const onSubmit: SubmitHandler<Recipe> = (data) => addMutation.mutate(data);

  const divRef = useRef<HTMLDivElement>(null);
  const scrollToLastMessage = () => {
    divRef.current?.scroll({
      top: divRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Dialog
      header={i18next.t('startpage:recipes.new.header')}
      visible={open}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <div
        ref={divRef}
        style={{ height: '100%', overflowY: 'auto' }}
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        >

          {!addMutation.isLoading && !areInstructionsLoading ? (
            <MainContainer vertical gap={20}>

              <ContentContainer gap={10}>

                <Container vertical gap={20}>
                  <BaseFields vertical gap={7}>
                    <Field
                      width={332}
                      name="name"
                      register={register}
                      placeholder={i18next.t('domain:recipe.name')}
                      error={formState.errors.name}
                      errorText={i18next.t('forms:fields.errors.required')}
                      required
                    />
                    <Container gap={7}>
                      <Field
                        width={252}
                        name="link"
                        register={register}
                        placeholder={i18next.t('domain:recipe.link')}
                        error={formState.errors.link}
                        errorText={i18next.t('forms:fields.errors.required')}
                        required
                      />
                      <Field
                        width={72}
                        type="number"
                        step="0.01"
                        name="size"
                        register={register}
                        placeholder={i18next.t('domain:recipe.size')}
                        error={formState.errors.size}
                        errorText={i18next.t('forms:fields.errors.required')}
                        required
                      />
                    </Container>
                  </BaseFields>
                  <ImageField
                    name="img"
                    control={control}
                    defaultValue={defaultValues ? defaultValues.img : undefined}
                    defaultUrl={defaultValues ? defaultValues.pressignedUrl : undefined}
                  />
                </Container>

                <InstructionsField control={control} register={register} />

                {/* // todo перенести продуктс внутрь чтобы кнопка добавить оставалась даже если продуктов нет */}

                {products?.length && (
                  <ProductsField
                    products={products}
                    setValue={setValue}
                    onActive={scrollToLastMessage}
                    control={control}
                    name="recipeProducts"
                  />
                )}

              </ContentContainer>

              <EndContainer>
                <TagsField tags={tags} control={control} name="tags" />
                <SubmitButton styleType="accent" size="large" type="submit">
                  {i18next.t('startpage:recipes.actions.save')}
                </SubmitButton>
              </EndContainer>
            </MainContainer>
          ) : (<LoadingWrapper><Loading /></LoadingWrapper>)}

        </form>
      </div>

    </Dialog>
  );
};

const MainContainer = styled(Container)`
  @media (max-width: 1120px) {
    width: 340px;
  }
`;

const LoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled(Container)`
  @media (max-width: 1120px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const EndContainer = styled(Container)`
  @media (max-width: 1120px) {
    flex-direction: column;
    gap: 20px;
    padding-left: 13px;
    width: 340px;
  }
`;

const SubmitButton = styled(Button)`
  @media (max-width: 1120px) {
    align-self: flex-end;
  }
`;

const BaseFields = styled(Container)`
  @media (max-width: 1120px) {
    margin-left: 5px;
  }
`;

export { AddRecipe };
