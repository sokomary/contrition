import React, {
  FC, useRef, useState,
} from 'react';
import { Dialog } from 'primereact/dialog';
import {
  useForm, SubmitHandler, useWatch,
} from 'react-hook-form';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { addRecipe, getInstructions, getProducts } from '../../../api/api';
import { Recipe, RecipeProduct } from '../../../domain/Recipe';
import i18next from '../../../i18next';
import { Container } from '../../ui/Container';
import { Field } from '../../ui/form/Field';
import { AddProductDialog } from './AddProductDialog';
import { Tag } from '../../../domain/Tag';
import { Button } from '../../ui/Button';
import { AddTagDialog } from './AddTagDialog';
import { ProductsField } from './fields/ProductsField';
import { TagsField } from '../../ui/form/TagsField';
import { color } from '../../ui/theme';
import { ReactComponent as DeleteSvg } from '../../../assets/icons/delete_icon.svg';
import { ImageUrlField } from '../../ui/form/ImageUrlField';
import { Loading } from '../../ui/Loading';
import { InstructionsField } from './fields/InstructionsField';

const RecipeDialog: FC<{
  tags: Tag[]; open: boolean; onClose: (result?: Recipe) => void; defaultValues?: Recipe;
}> = ({
  tags, open, onClose, defaultValues,
}) => {
  const { data: products, isLoading } = useQuery('products', () => getProducts());
  const { data: instructions, isLoading: areInstructionsLoading } = useQuery(
    `instructions-${defaultValues?.id}`,
    () => getInstructions(defaultValues!.id),
    { enabled: defaultValues?.id !== undefined, suspense: true },
  );

  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [openNewTag, setOpenNewTag] = useState(false);

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
  const selectedProducts = useWatch({
    control,
    name: 'recipeProducts',
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
    <WideDialog
      headerStyle={{
        borderRadius: '20px 20px 0px 0px',
        backgroundColor: color('dialog-background'),
        color: color('font'),
      }}
      contentStyle={{ borderRadius: '0px 0px 20px 20px', backgroundColor: color('dialog-background') }}
      header={i18next.t('startpage:recipes.new.header')}
      visible={open}
      onHide={() => {
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
            <MainContainer vertical gap={30}>

              <ContentContainer gap={10}>

                <Container style={{ marginTop: 20 }} vertical gap={30}>

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

                  <ImageUrlField
                    name="img"
                    control={control}
                    defaultValue={defaultValues ? defaultValues.img : undefined}
                    defaultUrl={defaultValues ? defaultValues.pressignedUrl : undefined}
                  />
                </Container>
                <InstructionsFieldContainer>
                  <InstructionsField control={control} register={register} />
                </InstructionsFieldContainer>

                <ProductsFieldContainer vertical gap={20}>
                  {!isLoading && !!products?.length && (
                    <ProductsField
                      onActive={scrollToLastMessage}
                      control={control}
                      name="recipeProducts"
                      products={products}
                      onNewClick={() => setOpenNewProduct(true)}
                    />
                  )}
                  <ProductsContainer gap={5}>
                    {selectedProducts?.sort((rp1, rp2) => (rp1.product.id > rp2.product.id ? 1 : -1))
                      .map((sp) => (
                        <Container key={sp.product.id} style={{ height: 34 }}>
                          <QuantityInput
                            value={sp.quantity}
                            onChange={(quantity) => setValue(
                              'recipeProducts',
                              [
                                ...selectedProducts.filter((rp) => !isEqual(rp, sp)),
                                { id: sp.id, product: sp.product, quantity: parseInt(quantity.toString(), 10) },
                              ],
                            )}
                          />
                          <Name data-tooltip-id={`product-delete${sp.product.id}`}><NameText>{sp.product.name}</NameText></Name>
                          <ReactTooltip
                            offset={0}
                            id={`product-delete${sp.product.id}`}
                            clickable
                            delayShow={600}
                            style={{ backgroundColor: 'white' }}
                          >
                            <DeleteIcon
                              onClick={() => setValue(
                                'recipeProducts',
                                (selectedProducts as RecipeProduct[]).filter((rp) => !isEqual(rp, sp)),
                              )}
                            />
                          </ReactTooltip>
                        </Container>
                      ))}
                  </ProductsContainer>
                </ProductsFieldContainer>
              </ContentContainer>

              <EndContainer>
                <TagsFieldContainer vertical gap={5}>
                  <TagsField tags={tags} control={control} name="tags" />
                  <AddTagButton onClick={() => setOpenNewTag(true)}>
                    {i18next.t('startpage:recipes.actions.addTag')}
                  </AddTagButton>
                </TagsFieldContainer>
                <StyledButton styleType="accent" size="large" type="submit">
                  {i18next.t('startpage:recipes.actions.save')}
                </StyledButton>
              </EndContainer>
            </MainContainer>
          ) : (<LoadingWrapper><Loading /></LoadingWrapper>)}

        </form>
      </div>
      <AddTagDialog
        open={openNewTag}
        onClose={() => setOpenNewTag(false)}
      />
      <AddProductDialog
        open={openNewProduct}
        onClose={() => setOpenNewProduct(false)}
      />

    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 1120px;
  height: fit-content;
  
  @media (max-width: 1120px) {
    width: fit-content;
    max-height: 95%;
    overflow-y: auto;
  }
`;

const MainContainer = styled(Container)`
  @media (max-width: 1120px) {
    width: 340px;
  }
`;

const ProductsContainer = styled(Container)`
  flex-wrap: wrap;
  height: fit-content;
  max-width: 400px;
`;

const QuantityInput: FC<{ value: number | undefined; onChange: (value: number | string) => void }> = (props) => (
  <StyledInput
    type="number"
    value={props.value}
    onChange={(e) => props.onChange(e.target.value ? e.target.value as unknown as number : '')}
  />
);

const StyledInput = styled.input`
   ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  };
  width: 65px;
  height: 34px;
  border: none;
  border-radius: 25px;
  padding: 0 25px 0 5px;
  text-align: center;
  outline: none;
  background-color: ${color('secondary')};
  color: ${color('primary')};
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 20px 2px 20px;
  border-radius: 20px;
  background-color: ${color('accent-light')};
  color: ${color('accent')};
  margin-left: -30px;
  cursor: pointer;
  
  max-width: 280px;
`;

const NameText = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const AddTagButton = styled.div`
  font-size: 14px;
  color: ${color('accent')};
  cursor: pointer;
`;

const DeleteIcon = styled(DeleteSvg)`
  cursor: pointer;
  width: 15px;
  height: 15px;
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

const StyledButton = styled(Button)`
  @media (max-width: 1120px) {
    align-self: flex-end;
  }
`;

const BaseFields = styled(Container)`
  @media (max-width: 1120px) {
    margin-left: 5px;
  }
`;

const ProductsFieldContainer = styled(Container)`
  margin-top: 20px;
  padding: 0 20px;
  width: 35%;
  @media (max-width: 1120px) {
    margin: 0;
    width: 340px;
    padding: 10px;
  }
`;

const InstructionsFieldContainer = styled.div`
  max-height: 458px;
  margin-left: 20px;
  width: 30%;
  @media (max-width: 1120px) {
    width: 340px;
    margin-left: 0;
    max-height: fit-content;
  }
`;

const TagsFieldContainer = styled(Container)`
  @media (max-width: 1120px) {
  }
`;

export { RecipeDialog };
