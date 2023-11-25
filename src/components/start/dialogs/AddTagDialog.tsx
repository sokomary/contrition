import React, { FC, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { API } from '../../../api';
import i18next from '../../../i18next';
import { Container } from '../../ui/Container';
import { Field } from '../../ui/form/Field';
import { Button } from '../../ui/Button';
import { Tag, TagSchema } from '../../../domain/Tag';
import { Loading } from '../../ui/Loading';

const AddTagDialog: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const addTag = (values: Tag) => {
    setLoading(true);
    API.addTag({ ...values }).then(() => {
      onClose();
      setLoading(false);
    });
  };

  const [loading, setLoading] = useState(false);

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

  const onSubmit: SubmitHandler<Tag> = (data) => addTag(data);
  return (
    <WideDialog
      header="Новый тег"
      visible={open}
      onHide={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        { !loading ? (
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

  @media (max-width: 700px) {
    width: 80%;
  }
`;

export { AddTagDialog };
