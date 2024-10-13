import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { logout } from 'src/api';
import { Button } from 'src/components/features';
import * as css from './UserOptions.css';

export const UserOptions = () => {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return (
    <div className={css.container}>
      <Button kind="ghost" className={css.option} onClick={() => logoutMutation.mutate()}>Выйти</Button>
    </div>
  );
};
