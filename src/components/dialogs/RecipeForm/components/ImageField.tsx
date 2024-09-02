import React, {
  useRef, useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useController, UseControllerProps } from 'react-hook-form';
import { useMutation } from 'react-query';
import { upload } from 'src/api';
import { Container, Loading } from 'src/components/features';
import { Recipe } from 'src/domain/Recipe';
import { color } from 'src/theme';

type Props = UseControllerProps<Recipe> & {
  defaultValue?: string;
  defaultUrl?: string;
};

const ImageField = (props: Props) => {
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
      <Container vertical gap={10}>
        {uploadMutation.isLoading ? (
          <LoadingWrapper><Loading /></LoadingWrapper>
        ) : (
          <>
            {(!files.length && !props.defaultValue) ? (
              <PhotoInput onClick={onPhotoClick}>{uploadMutation.error ? 'Что-то пошло не так' : 'Фото'}</PhotoInput>
            ) : (
              <PhotoPreview
                onClick={onPhotoClick}
                background={files.length ? URL.createObjectURL(files[0]) : props.defaultUrl}
              />
            )}
          </>
        )}
        <HiddenInput onChange={handleChange} ref={ref} type="file" />
      </Container>
    </div>
  );
};

const HiddenInput = styled.input`
  display: none;
`;

const PhotoInput = styled.div`
  flex-shrink: 0;
  align-items: center;
  height: 333px;
  width: 333px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  background-color:${({ theme }) => color('field', theme)};
  border-radius: 10px;
  ${({ theme }) => ['iphone', 'ipadv'].includes(theme.screen) && css`
    margin-right: auto;
  `}
  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 363px;
    width: 363px;
  `};
  ${({ theme }) => theme.screen === 'ipadh' && css`
    height: 170px;
    width: 170px;
  `};
  opacity: 30;
`;

const PhotoPreview = styled(PhotoInput)<{ background?: any }>`
  ${(props) => (props.background
    ? `background-image: url(${props.background});
       background-repeat: no-repeat;
       background-origin: border-box;
       background-size: cover;
       background-position: center center;`
    : ''
  )};
`;

const LoadingWrapper = styled(PhotoInput)`
  opacity: 1;
  ${({ theme }) => ['iphone', 'ipadv'].includes(theme.screen) && css`
    margin-left: auto;
    margin-right: auto;
  `}
`;

export { ImageField };
