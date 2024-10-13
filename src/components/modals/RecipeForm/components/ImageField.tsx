import React, {
  useRef, useState,
} from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { useMutation } from 'react-query';
import { upload } from 'src/api';
import { Button, Loading } from 'src/components/features';
import { Recipe } from 'src/domain/Recipe';
import * as css from './ImageField.css';

type Props = UseControllerProps<Recipe> & {
  defaultValue?: string;
  defaultUrl?: string;
};

export const ImageField = (props: Props) => {
  const { field } = useController(props);
  const [files, setFiles] = useState<File[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const clear = () => {
    if (ref.current) {
      ref.current.value = '';
    }
    setFiles([]);
    field.onChange(undefined);
  };

  const onPhotoClick = () => {
    ref.current?.click();
  };

  const uploadMutation = useMutation({
    mutationFn: upload,
    onSuccess: (res) => {
      field.onChange(res);
    },
    onError: clear,
  });

  const handleChange = () => {
    if (ref.current?.files?.length) {
      const newFiles = Array.from(ref.current?.files || []);
      setFiles(newFiles);
      uploadMutation.mutate(newFiles[0]);
      field.onChange(newFiles);
    }
  };

  return (
    <div>
      <div className={css.container}>
        {uploadMutation.isLoading ? (
          <div className={css.loadingWrapper}><Loading /></div>
        ) : (
          <>
            {(!files.length && !props.defaultValue) ? (
              <Button kind="ghost" className={css.photoInput} onClick={onPhotoClick}>
                {uploadMutation.error ? 'Что-то пошло не так' : 'Фото'}
              </Button>
            ) : (
              <Button
                kind="ghost"
                className={css.photoPreview}
                style={{ backgroundImage: `url(${files.length ? URL.createObjectURL(files[0]) : props.defaultUrl})` }}
                onClick={onPhotoClick}
              />
            )}
          </>
        )}
        <input className={css.hiddenInput} onChange={handleChange} ref={ref} type="file" />
      </div>
    </div>
  );
};
