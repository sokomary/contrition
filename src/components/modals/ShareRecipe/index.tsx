import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar, Button, Dialog, Field } from 'src/components/features';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const ShareRecipe = () => {
  const { t } = useTranslation();
  const {
    isOpen,
    onClose,
    register,
    submit,
    errors,
    actions,
    friends,
    selectedUser,
    toggleFriend,
  } = useLogic();

  return (
    <Dialog
      header={t('startpage.recipes.share.header')}
      isActive={isOpen}
      onClose={onClose}
    >
      <form onSubmit={submit} className={css.container}>
        {!selectedUser && (
          <Field
            key='email'
            name='email'
            type='email'
            register={register}
            label={t('startpage.recipes.share.newFriend')}
            placeholder={t('startpage.recipes.share.emailPlaceholder')}
            error={errors.email}
            errorText={t('forms.fields.errors.required')}
          />
        )}

        <div>
          <div className={css.label}>
            {t('startpage.recipes.share.friends')}
          </div>
          <div className={css.friends}>
            {friends?.length ? (
              friends.map((friend) => (
                <Button
                  key={friend.friend.id}
                  className={css.friend({
                    selected: selectedUser?.id === friend.friend.id,
                  })}
                  onClick={() => toggleFriend(friend.friend)}
                >
                  {friend.friend.email}
                </Button>
              ))
            ) : (
              <div className={css.emptyState}>
                {t('features.dropdown.emptyState.text')}
              </div>
            )}
          </div>
        </div>

        <ActionBar actions={actions} className={css.actions} />
      </form>
    </Dialog>
  );
};
