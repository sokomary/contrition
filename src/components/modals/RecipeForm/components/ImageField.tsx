import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Loading } from 'src/components/features';
import { useLogic, Options } from './ImageField.useLogic';
import * as css from './ImageField.css';

export const ImageField = (props: Options) => {
  const { t } = useTranslation();
  const { isLoading, error, onClick, ref, files, handleChange } =
    useLogic(props);

  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (!files.length && !props.defaultValue) {
      return (
        <Button kind='ghost' className={css.photoInput} onClick={onClick}>
          {error ? 'Что-то пошло не так' : 'Выбрать'}
        </Button>
      );
    }

    return (
      <Button
        kind='ghost'
        className={css.photoPreview}
        style={{
          backgroundImage: `url(${files.length ? URL.createObjectURL(files[0]) : props.defaultUrl})`,
        }}
        onClick={onClick}
      />
    );
  };

  return (
    <div className={css.container}>
      <div className={css.label}>{t('domain.recipe.photo')}</div>

      <div className={css.content}>
        {renderContent()}

        <input
          className={css.hiddenInput}
          onChange={handleChange}
          ref={ref}
          type='file'
        />
      </div>
    </div>
  );
};
