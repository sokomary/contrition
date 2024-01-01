import { QueryClientProvider } from 'react-query';
import React, { ReactNode } from 'react';
import { queryClient } from './QueryProvider.queryClient';

type Props = {
  children?: ReactNode;
};

export const QueryProvider = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
