import React, { CSSProperties } from 'react';
import { Container, Loading } from 'src/components/features';
import styled, { css } from 'styled-components';
import { color } from 'src/theme';

type ControlCardItem = {
  id: number;
  name: string;
};

type Props = {
  addButtonText: string;
  header: string;
  items: ControlCardItem[];
  onAddClick: () => void;
  onOpenClick?: (item: { id: number }) => void;
  isLoading: boolean;
  infoOpen: boolean;
  style?: CSSProperties;
  className?: string;
};

export const ControlCard = (props: Props) => (
  <Control style={props.style} className={props.className}>
    <ControlContent infoOpen={props.infoOpen}>
      <Container>
        <ControlName gap={10}>
          <div>{props.header}</div>
          <DotsDivider />
          <div>{props.items.length}</div>
          {props.isLoading && <Loading />}
        </ControlName>
        <ControlAddButton onClick={props.onAddClick}>{props.addButtonText}</ControlAddButton>
      </Container>
      <ItemsList infoOpen={props.infoOpen} gap={6}>
        {props.items.map((t, i) => (
          <ItemName
            actionable={!!props.onOpenClick}
            onClick={() => props.onOpenClick && props.onOpenClick(t)}
            key={i}
          >
            {t.name}
          </ItemName>
        ))}
      </ItemsList>
    </ControlContent>
  </Control>
);

const Control = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const ControlContent = styled(Container)<{ infoOpen: boolean }>`
  flex-direction: column;
  gap: 10px;
  height: 100%;
  ${({ theme, infoOpen }) => theme.screen === 'ipadh' && !infoOpen && css`
    justify-content: flex-start;
  `};
`;

const ControlAddButton = styled(Container)`
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme }) => color('primary', theme)};
`;

const ItemsList = styled(Container)<{ infoOpen: boolean }>`
  flex-wrap: wrap;
  row-gap: 10px;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    background-color: transparent;
  };
  ${({ theme, infoOpen }) => theme.screen === 'ipadh' && !infoOpen && css`
    justify-content: flex-start;
    align-items: flex-start;
    height: fit-content;
    max-height: 100%;
    gap: 10px;
  `};
`;

const ItemName = styled(Container)<{ actionable: boolean }>`
  height: 30px;
  border-radius: 20px;
  padding: 2px 12px 4px 12px;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => color('font', theme)};
  background-color: ${({ theme }) => color('basic', theme)};
  ${({ actionable }) => (actionable ? 'cursor: pointer' : '')};
`;

// todo fix duplicated
const ControlName = styled(Container)`
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => color('label', theme)};
`;

// todo fix duplicated
const DotsDivider = styled.div`
  width: 5px; 
  height: 5px;
  border-radius: 2.5px;
  background-color:${({ theme }) => color('label', theme)};
  margin-top: 2px;
`;
