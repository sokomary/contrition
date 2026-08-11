import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { User } from 'src/types/domain';
import { friendRecipesApi, recipesApi, useAuthenticate } from 'src/api';
import { Action } from 'src/components/features';
import { useRouteModal } from 'src/router';
import { useDeviceScreen } from 'src/theme';
import { toast } from 'react-toastify';

type FormValues = { email: string };

export const useLogic = () => {
  const { t } = useTranslation();
  const screen = useDeviceScreen();

  const { isOpen, value, onClose } = useRouteModal({ key: 'recipe-share' });
  const recipeId = parseInt(value, 10);

  const user = useAuthenticate();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: friends } = useQuery({
    queryKey: ['friends', user?.id],
    queryFn: friendRecipesApi.getList,
    enabled: isOpen && !!user?.id,
  });

  const { register, handleSubmit, formState, reset, watch } =
    useForm<FormValues>();
  const email = watch('email');

  const close = () => {
    reset();
    setSelectedUser(null);
    onClose();
  };

  const shareMutation = useMutation({
    mutationFn: (recipientEmail: string) =>
      recipesApi.share({ recipeId, email: recipientEmail }),
    onSuccess: () => {
      toast(t('startpage.recipes.share.success'));
      close();
    },
    onError: () => toast(t('startpage.recipes.share.error'), { type: 'error' }),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    shareMutation.mutate(selectedUser ? selectedUser.email : data.email);

  const toggleFriend = (friend: User) =>
    setSelectedUser((prev) => (prev?.id === friend.id ? null : friend));

  const actions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: t('startpage.recipes.actions.share'),
      isLoading: shareMutation.isPending,
      disabled: !selectedUser && !email,
    },
  ];

  return {
    isOpen,
    onClose: close,
    register,
    errors: formState.errors,
    screen,
    submit: handleSubmit(onSubmit),
    actions,
    friends,
    selectedUser,
    toggleFriend,
  };
};
