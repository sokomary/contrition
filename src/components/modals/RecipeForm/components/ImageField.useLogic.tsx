import { useRef, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { upload } from 'src/api';
import { Recipe } from 'src/types/domain';

export type Options = UseControllerProps<Recipe> & {
  defaultValue?: string;
  defaultUrl?: string;
};

export const useLogic = (props: Options) => {
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

  const uploadMutation = useMutation({
    mutationFn: upload,
    onSuccess: field.onChange,
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

  return {
    files,
    onClick: () => ref.current?.click(),
    handleChange,
    isLoading: uploadMutation.isPending,
    error: uploadMutation.error,
    ref,
  };
};
