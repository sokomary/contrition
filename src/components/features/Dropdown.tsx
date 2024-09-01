import React, {
  useEffect, useRef, useState,
} from 'react';
import styled, { css } from 'styled-components';
import { isEqual } from 'lodash';
import { EnterIcon, SearchIcon } from 'src/assets';
import { color } from 'src/theme';
import { Container } from './Container';

type Props<T> = {
  options: { value: T; label: string }[];
  value: T[];
  onActive: () => void;
  onSelect: (value: T) => void;
};

export const Dropdown = <T = unknown>(props: Props<T>) => {
  const [value, setValue] = useState(props.value || []);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => setValue(props.value), [props.value]);

  const filteredOptions = props.options
    .filter((option) => (query.length ? option.label.toLowerCase().includes(query.toLowerCase()) : true));

  const inputRef = useRef<HTMLInputElement>(null);

  document.body.onclick = (e) => {
    const targetId = (e.target as HTMLElement).id;
    if (!targetId.includes('products-input') && !targetId.includes('option')) {
      setOpen(false);
    }
  };

  return (
    <Root vertical gap={1}>
      <DropdownContainer open={open}>
        <SearchIcon />
        <StyledInput
          autoComplete="off"
          id="products-input"
          ref={inputRef}
          onFocus={async () => {
            setOpen(true);
            props.onActive();
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <EnterIcon />
      </DropdownContainer>
      {open && (
        <DropdownContentContainer open={open} id="options-dropdown-container">
          {filteredOptions.length ? (
            <OptionsContainer id="options-container">
              {filteredOptions.map((o, index) => (
                <Container key={o.label}>
                  <Option
                    id={`option-${index}`}
                    selected={!!value.find((v) => isEqual(v, o.value))}
                    onClick={() => {
                      props.onSelect(o.value);
                      inputRef.current?.focus();
                      setQuery('');
                    }}
                  >
                    {o.label}
                  </Option>
                  {value.find((v) => isEqual(v, o.value)) && <Dot />}
                </Container>
              ))}
            </OptionsContainer>
          ) : (
            <EmptyState>Нет результатов</EmptyState>
          )}
        </DropdownContentContainer>
      )}
    </Root>
  );
};

const Root = styled(Container)`
  position: relative;
`;

const DropdownContainer = styled.div<{ open: boolean }>`
  width: 100%;
  height: 34px;
  z-index: 99;
  padding: 4px 8px;
  border-radius: ${({ open }) => (open ? '10px 10px 0 0' : '10px')};
  background: ${({ theme }) => color('background', theme)};
  box-shadow: ${({ open }) => (open ? '' : '0 0 10px 5px rgba(8, 8, 8, 0.07);')};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  align-items: center;
  
  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 42px;
    padding: 8px 16px;
  `};
`;

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 16px;
  padding: 0 8px;
  background: ${({ theme }) => color('background', theme)};
  color: ${({ theme }) => color('font', theme)};
`;

const EmptyState = styled.div`
  color: ${({ theme }) => color('label', theme)};
  font-size: 14px;
  text-align: center;
  padding: 18px;
`;

const DropdownContentContainer = styled.div<{ open?: boolean }>`
  width: 100%;
  border-radius: 10px;
  background: ${({ theme }) => color('background', theme)};
  box-shadow: ${({ open }) => (!open ? '' : '0 0 20px 5px rgba(8, 8, 8, 0.10);')};
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  z-index: 98;
  padding: 34px 8px 8px 8px;
  animation-duration: 0.3s;
  animation-name: itemsappears;
  animation-direction: alternate;
  @keyframes itemsappears {
    from {
      transform: scaleY(0);
      transform-origin: top center;
    }
    to {
      transform: scalzeY(1);
      transform-origin: top center;
    }
  }
`;

const OptionsContainer = styled.div`
  max-height: 140px;
  overflow-y: scroll;
`;

const Option = styled.div<{ selected: boolean }>`
  color: ${({ theme }) => color('font', theme)};
  height: 34px;
  padding: 8px;
  cursor: pointer;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  ${({ theme }) => theme.screen === 'iphone' && css`
    height: 42px;
  `};
  
  ${({ selected }) => (selected ? css`
        color: ${({ theme }) => color('label', theme)};
      ` : '')
}};
  
  &:hover {
    ${({ selected }) => (!selected
    ? css`
          background-color: ${({ theme }) => color('secondary', theme)};
          border-radius: 7px;
          font-size: 17px;
          color: ${({ theme }) => color('primary', theme)};
        `
    : css`font-size: 17px;`
  )
}}
`;

const Dot = styled.div`
  height: 7px;
  width: 7px;
  border-radius: 3.5px;
  background-color: ${({ theme }) => color('accent', theme)};
  align-self: center;
  margin-right: 4px;
`;
