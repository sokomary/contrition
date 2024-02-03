import React, { FC } from 'react';
import styled from 'styled-components';
import { color } from 'src/theme';

export const FieldError: FC<{ text: string }> = ({ text }) => (
  <ErrorText>{text}</ErrorText>
);

const ErrorText = styled.span`
  color: ${color('danger')};
  font-size: 10px;
`;
