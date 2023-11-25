import React, { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import styled from 'styled-components';
import { Recipe } from '../../../domain/Recipe';
import { Dropdown } from '../Dropdown';
import { Tag } from '../../../domain/Tag';
import { Container } from '../Container';

const DropdownField: FC<UseControllerProps<Recipe> & {
  options: { value: any; label: string }[];
  label?: string;
  onActive: () => void;
}> = (props) => {
  const { field } = useController(props);
  return (
    <Container vertical gap={5}>
      <Label>{props.label}</Label>
      <Dropdown
        onActive={props.onActive}
        options={props.options}
        value={field.value as Tag[]}
        onChange={field.onChange}
      />
    </Container>
  );
};

const Label = styled.div`
  color: slategrey;
  font-size: 12px;
`;

export { DropdownField };
