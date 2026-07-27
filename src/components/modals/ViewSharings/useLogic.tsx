import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Recipe, User } from 'src/types/domain';
import {
  disableContinuousSharing,
  getContinuousFriends,
  getFriends,
  shareRecipesCountinuously,
  unshareRecipe,
} from 'src/api';
import { Action } from 'src/components/features';
import { useRouteModal } from 'src/router';
import { toast } from 'react-toastify';

type RemoveTarget = { recipe: Recipe; email: string };

type FormValues = { email: string };

export const useLogic = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isOpen, onClose } = useRouteModal({ key: 'view-sharings' });

  const { data: continuousFriends } = useQuery({
    queryKey: ['continuous-friends'],
    queryFn: getContinuousFriends,
    enabled: isOpen,
  });

  const { data: recipients } = useQuery({
    queryKey: ['shared-recipients'],
    queryFn: getFriends,
    enabled: isOpen,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['continuous-friends'] });
    queryClient.invalidateQueries({ queryKey: ['shared-recipients'] });
  };

  const [removeTarget, setRemoveTarget] = useState<RemoveTarget | null>(null);
  const [cancelTarget, setCancelTarget] = useState<User | null>(null);

  const [addOpen, setAddOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);

  const { register, handleSubmit, formState, reset, watch } =
    useForm<FormValues>();
  const email = watch('email');

  const candidates = recipients
    ?.map(({ friend }) => friend)
    .filter(
      (friend) =>
        !continuousFriends?.some((shared) => shared.email === friend.email),
    );

  const closeAdd = () => {
    reset();
    setSelectedFriend(null);
    setAddOpen(false);
  };

  const removeMutation = useMutation({
    mutationFn: ({ recipe, email }: RemoveTarget) =>
      unshareRecipe(recipe.id, email),
    onSuccess: () => {
      toast(t('startpage.sharings.removed'));
      setRemoveTarget(null);
      invalidate();
    },
    onError: () => toast(t('startpage.sharings.error')),
  });

  const cancelMutation = useMutation({
    mutationFn: ({
      email,
      removeShared,
    }: {
      email: string;
      removeShared: boolean;
    }) => disableContinuousSharing(email, removeShared),
    onSuccess: () => {
      toast(t('startpage.sharings.cancelled'));
      setCancelTarget(null);
      invalidate();
    },
    onError: () => toast(t('startpage.sharings.error')),
  });

  const addMutation = useMutation({
    mutationFn: (recipientEmail: string) =>
      shareRecipesCountinuously(recipientEmail),
    onSuccess: () => {
      toast(t('startpage.sharings.continuous.added'));
      closeAdd();
      invalidate();
    },
    onError: () => toast(t('startpage.sharings.error'), { type: 'error' }),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    addMutation.mutate(selectedFriend ? selectedFriend.email : data.email);

  const addActions: Action[] = [
    {
      kind: 'primary',
      type: 'submit',
      label: t('startpage.sharings.continuous.add.submit'),
      isLoading: addMutation.isPending,
      disabled: !selectedFriend && !email,
    },
  ];

  const close = () => {
    setRemoveTarget(null);
    setCancelTarget(null);
    closeAdd();
    onClose();
  };

  return {
    isOpen,
    onClose: close,
    continuousFriends,
    recipients,
    removeTarget,
    setRemoveTarget,
    cancelTarget,
    setCancelTarget,
    confirmRemove: () => removeTarget && removeMutation.mutate(removeTarget),
    removing: removeMutation.isPending,
    cancelKeepShared: () =>
      cancelTarget &&
      cancelMutation.mutate({ email: cancelTarget.email, removeShared: false }),
    cancelUnshareAll: () =>
      cancelTarget &&
      cancelMutation.mutate({ email: cancelTarget.email, removeShared: true }),
    cancelling: cancelMutation.isPending,
    addOpen,
    openAdd: () => setAddOpen(true),
    closeAdd,
    candidates,
    selectedFriend,
    toggleFriend: (friend: User) =>
      setSelectedFriend((prev) => (prev?.id === friend.id ? null : friend)),
    register,
    errors: formState.errors,
    submitAdd: handleSubmit(onSubmit),
    addActions,
  };
};
