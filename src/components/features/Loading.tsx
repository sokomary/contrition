import React from 'react';
import styled from 'styled-components';

export const Loading = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

const SpinnerContainer = styled.div`
  display: flex;
  height: 42px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3; 
  border-top: 3px solid #383636;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
