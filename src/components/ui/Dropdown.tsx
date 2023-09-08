import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import { ReactComponent as DownSvg } from '../../assets/icons/down.svg';
import { Container } from './Container';

const Dropdown: FC<{
  options: { value: any; label: string }[];
  value: any[];
  onChange: (value: any) => void;
}> = (props) => {
  const [value, setValue] = useState(props.value || []);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Container vertical gap={1}>
      <DropdownContainer open={open} onClick={() => setOpen(!open)}>
        <Labels>
          {props.options
            .filter((o) => value.find((v) => isEqual(v, o.value)))
            .map((o) => o.label).join(', ')}
        </Labels>
        <StyledIcon open={open} />
      </DropdownContainer>
      {open && (
        <OptionsContainer>
          {props.options.map((o) => (
            <Option
              selected={value.find((v) => isEqual(v, o.value))}
              key={o.label}
              onClick={() => {
                props.onChange(value.find((v) => isEqual(v, o.value))
                  ? [...value.filter((v) => !isEqual(v, o.value))]
                  : [...value, o.value]);
              }}
            >
              {o.label}
            </Option>
          ))}
        </OptionsContainer>
      )}
    </Container>
  );
};

const DropdownContainer = styled.div<{ open: boolean }>`
  width: 200px;
  height: 30px;
  border: solid 1px pink;
  border-radius: ${({ open }) => (open ? '5px 5px 0 0' : '5px')};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding-right: 2px;
`;

const Labels = styled.div`
  width: 190px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 3px 0 0 8px;
`;

const StyledIcon = styled(DownSvg)<{ open: boolean }>`
  align-self: center;
  ${(props) => props.open && 'transform: rotate(180deg);'}
`;

const OptionsContainer = styled.div`
  width: 200px;
  border: solid 1px pink;
  border-radius: 0 0 5px 5px;
  margin-top: 29px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  z-index: 99;
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
  max-height: 150px;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Option = styled.div<{ selected: boolean }>`
  color: pink;
  padding: 0 8px;
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`;

export { Dropdown };
