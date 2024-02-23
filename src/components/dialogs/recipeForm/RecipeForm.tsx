import React, {
  FC, useRef,
} from 'react';

import {
  useForm, SubmitHandler,
} from 'react-hook-form';
import styled, { css } from 'styled-components';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { addRecipe, getInstructions, getProducts } from 'src/api';
import { Recipe, Tag } from 'src/domain';
import i18next from 'src/formatter';
import {
  Container, Field, Button, Loading, Dialog,
} from 'src/components/features';
import { useDeviceScreen } from 'src/hooks';
import { color } from 'src/theme';
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

  const getPosition = () => {
    if (screen === 'iphone') {
      return 'bottom';
    }
    if (screen === 'ipadv' || screen === 'ipadh') {
      return 'top';
    }
    return undefined;
  };

  const screen = useDeviceScreen();
  return (
    <StyledDialog
      position={getPosition()}
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
            <Container vertical gap={20}>

              <ContentContainer gap={10}>

                <Container vertical gap={20}>
                  <BaseFields vertical gap={7}>
                    <Field
                      size={screen === 'iphone' ? 'large' : undefined}
                      width={screen === 'iphone' ? undefined : 332}
                      name="name"
                      register={register}
                      placeholder={i18next.t('domain:recipe.name')}
                      error={formState.errors.name}
                      errorText={i18next.t('forms:fields.errors.required')}
                      required
                    />
                    <Container gap={screen === 'iphone' ? undefined : 7}>
                      <Field
                        size={screen === 'iphone' ? 'large' : undefined}
                        width={252}
                        name="link"
                        register={register}
                        placeholder={i18next.t('domain:recipe.link')}
                        error={formState.errors.link}
                        errorText={i18next.t('forms:fields.errors.required')}
                        required
                      />
                      <Field
                        size={screen === 'iphone' ? 'large' : undefined}
                        width={screen === 'iphone' ? 104 : 72}
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
                  {screen === 'iphone' && <TagsField tags={tags} control={control} name="tags" />}
                  <ImageField
                    name="img"
                    control={control}
                    defaultValue={defaultValues ? defaultValues.img : undefined}
                    defaultUrl={defaultValues ? defaultValues.pressignedUrl : undefined}
                  />
                </Container>

                <InteractiveFields>
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
                </InteractiveFields>

              </ContentContainer>

              <EndContainer>
                {screen !== 'iphone' && <TagsField tags={tags} control={control} name="tags" />}
                <SubmitButton size="large" type="submit">
                  {i18next.t('startpage:recipes.actions.save')}
                </SubmitButton>
              </EndContainer>
            </Container>
          ) : (<LoadingWrapper><Loading /></LoadingWrapper>)}

        </form>
      </div>

    </StyledDialog>
  );
};

const InteractiveFields = styled.div`
  width: 100%;
  ${({ theme }) => theme.screen !== 'ipadv' && css`
    display: contents;
  `}
`;

const StyledDialog = styled(Dialog)`
 ${({ theme }) => theme.screen === 'iphone' && css`
    width: 100%;
    height: 100%;
  `}
 
 ${({ theme }) => ['ipadh', 'ipadv'].includes(theme.screen) && css`
    width: 100%;
  `}
 
 ${({ theme }) => ['ipadh'].includes(theme.screen) && css`
    height: 60%;
  `}
`;

const LoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled(Container)`
   ${({ theme }) => ['iphone'].includes(theme.screen) && css`
    flex-direction: column;
    gap: 20px;
  `}
`;

const EndContainer = styled(Container)`
  ${({ theme }) => theme.screen === 'iphone' && css`
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding-bottom: 15px;
  `};
`;

const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => color('primary', theme)};
  color:  ${({ theme }) => color('basic', theme)};
  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 100%;
  `};
`;

const BaseFields = styled(Container)`

  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 100%;
  `};
`;

export { AddRecipe };
