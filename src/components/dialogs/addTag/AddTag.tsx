import React, { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import i18next from 'src/formatter';
import { Tag, TagSchema } from 'src/domain';
import { addTag } from 'src/api';
import {
  Button, Container, Dialog, Field, Loading,
} from 'src/components/features';
import { useMediaQuery } from 'src/hooks';

export const AddTag: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm<Tag>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const isMobile = useMediaQuery('(max-width: 740px)');

  const onSubmit: SubmitHandler<Tag> = (data) => addMutation.mutate(data);
  return (
    <Dialog
      position={isMobile ? 'bottom' : undefined}
      width={!isMobile ? 350 : undefined}
      header="Новый тег"
      visible={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        { !addMutation.isLoading ? (
          <Container vertical gap={15}>
            {Object.entries(TagSchema.props).filter((k) => k[0] !== 'id').map((key) => (
              <Field
                key={key[0]}
                name={key[0]}
                register={register}
                placeholder={i18next.t(`domain:recipe.${key[0]}`)}
                // @ts-ignore
                error={formState.errors[key[0]]}
                errorText={i18next.t('forms:fields.errors.required')}
                required
              />
            ))}
            <SaveButton type="submit">Сохранить</SaveButton>
          </Container>
        ) : <Loading />}
      </form>
    </Dialog>
  );
};

const SaveButton = styled(Button)`
  align-self: flex-end;
`;
