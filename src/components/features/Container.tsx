import styled from 'styled-components';

export const Container = styled.div<{ vertical?: boolean; gap?: number }>`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
  ${(props) => (props.gap ? `gap: ${props.gap}px;` : 'justify-content: space-between;')}
`;
