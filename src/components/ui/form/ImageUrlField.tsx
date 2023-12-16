import React, {
  FC, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useController, UseControllerProps } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Container } from '../Container';
import { Recipe } from '../../../domain/Recipe';
import { theme } from '../theme';
import { Loading } from '../Loading';
import { upload } from '../../../api/api';

const ImageUrlField: FC<UseControllerProps<Recipe> & { defaultValue?: string; defaultUrl?: string }> = (props) => {
  const { field } = useController(props);
  const [files, setFiles] = useState<File[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const onClear = () => {
    if (ref.current) {
      ref.current.value = '';
    }
    setFiles([]);
    field.onChange(undefined);
  };

  const handleClick = () => {
    ref.current?.click();
  };

  const uploadMutation = useMutation({
    mutationFn: upload,
    onSuccess: (res) => {
      field.onChange(res);
    },
    onError: () => {
      onClear();
    },
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
              <PhotoInput onClick={handleClick}>{uploadMutation.error ? 'Что-то пошло не так' : 'Фото'}</PhotoInput>
            ) : (
              <StyledDiv
                onClick={handleClick}
                background={
                  files.length ? URL.createObjectURL(files[0]) : props.defaultUrl
                }
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

const StyledDiv = styled.div<{ background?: any }>`
  height: 333px;
  width: 333px;
  cursor: pointer;
  border-radius: 11px;
  background-color: rgba(74, 97, 97, 0.36);
  display: flex;
  justify-content: center;
  opacity: 30;
  @media (max-width: 890px) {
    margin-left: 5px;
    margin-right: auto;
  }
  ${(props) => (props.background
    ? `background-image: url(${props.background});
     background-repeat: no-repeat;
     background-origin: border-box;
     background-size: cover;
     background-position: center center;`
    : '')}
`;

const PhotoInput = styled.div`
  height: 333px;
  width: 333px;
  background-color: ${theme.color.field};
  border-radius: 20px;
  flex-shrink: 0;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;

  @media (max-width: 1120px) {
    margin-left: 5px;
  }
`;

const LoadingWrapper = styled.div`
  height: 333px;
  width: 333px;
  
  display: flex;
  justify-items: center;
  align-items: center;

  @media (max-width: 890px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export { ImageUrlField };
