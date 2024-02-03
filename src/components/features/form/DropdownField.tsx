import React, { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import styled from 'styled-components';
import { Recipe, Tag } from 'src/domain';
import { Dropdown, Container } from 'src/components/features';

export const DropdownField: FC<UseControllerProps<Recipe> & {
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
