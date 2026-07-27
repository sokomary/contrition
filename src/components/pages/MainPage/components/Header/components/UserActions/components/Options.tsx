import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { logout } from 'src/api';
import { Button } from 'src/components/features';
import { useToggleModal } from 'src/components/modals';
import * as css from './Options.css';

export const Options = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { open: openSharings } = useToggleModal('view-sharings', 'true');
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return (
    <div className={css.container}>
      <Button kind='ghost' className={css.option} onClick={openSharings}>
        {t('startpage.sharings.action')}
      </Button>
      <Button
        kind='ghost'
        className={css.option}
        onClick={() => logoutMutation.mutate()}
      >
        Выйти
      </Button>
    </div>
  );
};
