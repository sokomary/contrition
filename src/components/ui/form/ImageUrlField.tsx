import React, {
  FC, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useController, UseControllerProps } from 'react-hook-form';
import { Container } from '../Container';
import { Recipe } from '../../../domain/Recipe';
import { API } from '../../../api';
import { theme } from '../theme';
import { Loading } from '../Loading';

const ImageUrlField: FC<UseControllerProps<Recipe> & { defaultValue?: string; defaultUrl?: string }> = (props) => {
  const { field } = useController(props);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

  const handleChange = () => {
    setLoading(true);
    if (ref.current?.files?.length) {
      const newFiles = Array.from(ref.current?.files || []);
      setFiles(newFiles);
      API.upload(newFiles[0]).then((res) => {
        field.onChange(res);
        setLoading(false);
      }).catch(() => {
        onClear();
        setError(true);
        setLoading(false);
      });
      field.onChange(newFiles);
    }
  };

  return (
    <div>
      <Container vertical gap={10}>
        {loading ? (
          <LoadingWrapper><Loading /></LoadingWrapper>
        ) : (
          <>
            {(!files.length && !props.defaultValue) ? (
              <PhotoInput onClick={handleClick}>{error ? 'Что-то пошло не так' : 'Фото'}</PhotoInput>
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
  @media (max-width: 700px) {
    margin-left: auto;
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

  @media (max-width: 700px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const LoadingWrapper = styled.div`
  height: 333px;
  width: 333px;
  
  display: flex;
  justify-items: center;
  align-items: center;

  @media (max-width: 700px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export { ImageUrlField };
