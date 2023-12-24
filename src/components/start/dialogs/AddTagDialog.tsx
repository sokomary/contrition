import React, { FC, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { addTag } from '../../../api/api';
import i18next from '../../../i18next';
import { Container } from '../../ui/Container';
import { Field } from '../../ui/form/Field';
import { Button } from '../../ui/Button';
import { Tag, TagSchema } from '../../../domain/Tag';
import { Loading } from '../../ui/Loading';
import { color } from '../../ui/theme';

const AddTagDialog: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
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

  const onSubmit: SubmitHandler<Tag> = (data) => addMutation.mutate(data);
  return (
    <WideDialog
      headerStyle={{
        borderRadius: '20px 20px 0px 0px',
        backgroundColor: color('dialog-background'),
        color: color('font'),
      }}
      contentStyle={{ borderRadius: '0px 0px 20px 20px', backgroundColor: color('dialog-background') }}
      header="Новый тег"
      visible={open}
      onHide={onClose}
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
            <Button style={{ alignSelf: 'flex-end ' }} type="submit">Сохранить</Button>
          </Container>
        ) : <Loading />}
      </form>
    </WideDialog>
  );
};

const WideDialog = styled(Dialog)`
  width: 30%;

  @media (max-width: 890px) {
    width: 80%;
  }
`;

export { AddTagDialog };
