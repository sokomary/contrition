import React, { FC } from 'react';
import styled from 'styled-components';

const FieldError: FC<{ text: string }> = ({ text }) => (
  <ErrorText>{text}</ErrorText>
);

const ErrorText = styled.span`
  color: #e54a4a;
  font-size: 10px;
`;

export { FieldError };
