import { api } from 'src/api';

type UploadImageParams = {
  file: File;
};

export const upload = ({ file }: UploadImageParams) => {
  const formData = new FormData();
  formData.append('file', file);

  return api
    .post<any, { data: string }>('/api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({ data }) => data);
};
