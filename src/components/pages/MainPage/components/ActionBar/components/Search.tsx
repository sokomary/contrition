import React, { useState } from 'react';
import { ClearIcon } from 'src/assets';
import styled, { css } from 'styled-components';
import { Container } from 'src/components/features';
import { color } from 'src/theme';

type Props = {
  onQueryChange: (q: string) => void;
  className?: string;
};

export const Search = ({ onQueryChange, className }: Props) => {
  const [q, setQ] = useState('');
  return (
    <SearchContainer className={className}>
      <StyledInput
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          onQueryChange(e.target.value);
        }}
        placeholder="Поиск"
      />
      <ClearIconContainer
        onClick={() => {
          setQ('');
          onQueryChange('');
        }}
      >
        <ClearIcon />
      </ClearIconContainer>
    </SearchContainer>
  );
};

const SearchContainer = styled(Container)`
  width: 30%;
  align-items: center;
  position: relative;

  ${({ theme }) => theme.screen === 'iphone' && css`
    width: 100%;
  `}
`;

const StyledInput = styled.input`
  height: 42px;
  border-radius: 15px;
  background-color: ${({ theme }) => color('field', theme)};
  color:${({ theme }) => color('label', theme)};
  outline: none;
  border: none;
  padding: 0 15px;
  align-self: center;
  font-size: 16px;
  width: 100%;

  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 30px;
    border-radius: 10px;
  `}
`;

const ClearIconContainer = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
