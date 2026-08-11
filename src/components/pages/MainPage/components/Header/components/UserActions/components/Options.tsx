import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/features';
import { useToggleModal } from 'src/components/modals';
import { unscopedApi } from 'src/api';
import * as css from './Options.css';

type Props = {
  onAction?: () => void;
};

export const Options = ({ onAction }: Props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { open: openSharings } = useToggleModal('view-sharings', 'true');
  const logoutMutation = useMutation({
    mutationFn: unscopedApi.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return (
    <nav className={css.container}>
      <Button
        kind='ghost'
        className={css.option}
        onClick={() => {
          onAction?.();
          openSharings();
        }}
      >
        {t('startpage.sharings.action')}
      </Button>
      <Button
        kind='ghost'
        className={css.option}
        onClick={() => {
          onAction?.();
          logoutMutation.mutate();
        }}
      >
        {t('startpage.actions.logout')}
      </Button>
    </nav>
  );
};
