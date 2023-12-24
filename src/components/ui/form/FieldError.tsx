import React, { FC } from 'react';
import styled from 'styled-components';
import { color } from '../theme';

const FieldError: FC<{ text: string }> = ({ text }) => (
  <ErrorText>{text}</ErrorText>
);

const ErrorText = styled.span`
  color: ${color('success')};
  font-size: 10px;
`;

export { FieldError };
