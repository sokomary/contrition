import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { Dialog } from 'primereact/dialog';
import {
  useForm, SubmitHandler, useWatch,
} from 'react-hook-form';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { API } from '../../../api';
import { Recipe, RecipeProduct } from '../../../domain/Recipe';
import i18next from '../../../i18next';
import { Container } from '../../ui/Container';
import { Field } from '../../ui/form/Field';
import { Product } from '../../../domain/Product';
import { AddProductDialog } from './AddProductDialog';
import { Tag } from '../../../domain/Tag';
import { Button } from '../../ui/Button';
import { AddTagDialog } from './AddTagDialog';
import { ProductsField } from './fields/ProductsField';
import { TagsField } from '../../ui/form/TagsField';
import { theme } from '../../ui/theme';
import { ReactComponent as DeleteSvg } from '../../../assets/icons/delete_icon.svg';
import { ImageUrlField } from '../../ui/form/ImageUrlField';
import { Loading } from '../../ui/Loading';
import { StepsPartsField } from './fields/StepsPartsField';

const RecipeDialog: FC<{
  tags: Tag[]; open: boolean; onClose: (result?: Recipe) => void; defaultValues?: Recipe;
}> = ({
  tags: initTags, open, onClose, defaultValues,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openNewProduct, setOpenNewProduct] = useState(false);

  const [tags, setTags] = useState<Tag[]>(initTags);
  const [openNewTag, setOpenNewTag] = useState(false);

  const [loading, setLoading] = useState(false);

  const addRecipe = (values: Recipe) => {
    // setLoading(true);
    API.addRecipe(values).then(() => {
      onClose(values);
      setLoading(false);
    });
  };

  const getProducts = () => {
    API.getProducts().then((res) => setProducts(res));
  };
  useEffect(() => {
    getProducts();
  }, []);

  const getTags = () => {
    API.getTags().then((res) => setTags(res));
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState,
    setValue,
  } = useForm<Recipe>({
    defaultValues: defaultValues || { recipeProducts: [], tags: [] },
  });
  const selectedProducts = useWatch({
    control,
    name: 'recipeProducts',
  });

  const onSubmit: SubmitHandler<Recipe> = (data) => {
    addRecipe(data);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const scrollToLastMessage = () => {
    divRef.current?.scroll({
      top: divRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <WideDialog
      header={i18next.t('startpage:recipes.new.header')}
      visible={open}
      onHide={() => {
        onClose();
        reset();
      }}
    >
      <div
        ref={divRef}
        style={{
          height: '100%', overflowY: 'auto',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {!loading ? (
            <Container vertical gap={30}>

              <ContentContainer gap={70}>

                <Container vertical gap={30}>

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
                <StepsPartsFieldContainer>
                  <StepsPartsField control={control} name="instructions" />
                </StepsPartsFieldContainer>

                <ProductsFieldContainer style={{ width: 333 }} vertical gap={20}>
                  <ProductsField
                    onActive={scrollToLastMessage}
                    control={control}
                    name="recipeProducts"
                    products={products}
                    onNewClick={() => setOpenNewProduct(true)}
                  />
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
                            <DeleteIcon onClick={() => setValue(
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
                  <AddTagButton
                    onClick={() => setOpenNewTag(true)}
                  >
                    {i18next.t('startpage:recipes.actions.addTag')}
                  </AddTagButton>
                </TagsFieldContainer>
                <StyledButton styleType="accent" size="large" type="submit">
                  {i18next.t('startpage:recipes.actions.save')}
                </StyledButton>
              </EndContainer>
            </Container>
          ) : (<LoadingWrapper><Loading /></LoadingWrapper>)}

        </form>
      </div>
      <AddTagDialog
        open={openNewTag}
        onClose={() => {
          setOpenNewTag(false);
          getTags();
        }}
      />
      <AddProductDialog
        open={openNewProduct}
        onClose={() => {
          setOpenNewProduct(false);
          getProducts();
        }}
      />
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 1120px;
  height: 645px;
  @media (max-width: 700px) {
    max-width: 95%;
    height: 100%;
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
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 20px 2px 20px;
  border-radius: 20px;
  background-color: ${theme.color.accentLight};
  color: ${theme.color.accent};
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
  color: ${theme.color.accent};
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
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const EndContainer = styled(Container)`
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: 700px) {
    align-self: flex-end;
  }
`;

const BaseFields = styled(Container)`
  @media (max-width: 700px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ProductsFieldContainer = styled(Container)`
  @media (max-width: 700px) {
    margin-left: auto;
    margin-right: auto;
    width: auto;
  }
`;
const StepsPartsFieldContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  @media (max-width: 700px) {
    margin-left: 6px;
  }
`;

const TagsFieldContainer = styled(Container)`
  @media (max-width: 700px) {
    margin-left: 6px;
  }
`;

export { RecipeDialog };
