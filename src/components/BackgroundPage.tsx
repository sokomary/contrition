import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { CommonProps } from './ui/CommonProps';

interface Props extends CommonProps, PropsWithChildren {
  background: string;
  infinity?: boolean;
}

const BackgroundPage: FC<Props> = (props) => (
  <StyledPage
    background={props.background}
    className={props.className}
    style={props.style}
    infinity={props.infinity}
  >
    {props.children}
  </StyledPage>
);

const StyledPage = styled.div<{ background: any; infinity?: boolean }>`
  ${(props) => (props.infinity ? 'min-height:  100vh' : 'height:  100vh')};
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-origin: border-box;
  background-size: cover;
`;

export { BackgroundPage };
