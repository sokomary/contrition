import React from 'react';
import { Container } from 'src/components/features';

type Props = {
  label: string;
  content: React.ReactNode;
};

export const Value = ({ label, content }: Props) => (
  <Container gap={5}>
    <div>{label}</div>
    <div>{content}</div>
  </Container>
);
