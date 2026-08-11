import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar, Button, Dialog, Field } from 'src/components/features';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const ShareRecipe = () => {
  const { t } = useTranslation();
  const friendsLabelId = useId();
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
          />
        )}

        {!!friends?.length && (
          <section aria-labelledby={friendsLabelId}>
            <h5 className={css.label} id={friendsLabelId}>
              {t('startpage.recipes.share.friends')}
            </h5>
            <div className={css.friends}>
              {friends.map((friend) => (
                <Button
                  key={friend.friend.id}
                  className={css.friend({
                    selected: selectedUser?.id === friend.friend.id,
                  })}
                  aria-pressed={selectedUser?.id === friend.friend.id}
                  onClick={() => toggleFriend(friend.friend)}
                >
                  {friend.friend.email}
                </Button>
              ))}
            </div>
          </section>
        )}

        <ActionBar actions={actions} className={css.actions} />
      </form>
    </Dialog>
  );
};
