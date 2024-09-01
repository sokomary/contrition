import React from 'react';
import styled from 'styled-components';
import { color } from 'src/theme';

type Props = {
  text: string;
};

export const FieldError = ({ text }: Props) => (
  <ErrorText>{text}</ErrorText>
);

const ErrorText = styled.span`
  color: ${({ theme }) => color('danger', theme)};
  font-size: 10px;
`;
