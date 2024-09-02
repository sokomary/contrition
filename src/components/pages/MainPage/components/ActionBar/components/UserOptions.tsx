import { useMutation, useQueryClient } from 'react-query';
import React from 'react';
import styled from 'styled-components';
import { logout } from 'src/api';
import { Container } from 'src/components/features';
import { color } from 'src/theme';

export const UserOptions = () => {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      window.location.href = '/login';
    },
  });

  return (
    <Options>
      <Option onClick={() => logoutMutation.mutate()}>Выйти</Option>
    </Options>
  );
};

const Options = styled(Container)`
  position: absolute;
  border-radius: 5px;
  background: #FFF;
  box-shadow: 0 0 20px 5px rgba(8, 8, 8, 0.10);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  right: 0;
  top: 45px;
`;

const Option = styled.div`
  width: 70px;
  height: 25px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => color('primary', theme)};
  }
`;
