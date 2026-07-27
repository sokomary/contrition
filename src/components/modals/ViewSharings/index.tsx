import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar, Button, Dialog, Field } from 'src/components/features';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const ViewSharings = () => {
  const { t } = useTranslation();
  const {
    isOpen,
    onClose,
    continuousFriends,
    recipients,
    removeTarget,
    setRemoveTarget,
    cancelTarget,
    setCancelTarget,
    confirmRemove,
    removing,
    cancelKeepShared,
    cancelUnshareAll,
    cancelling,
    addOpen,
    openAdd,
    closeAdd,
    candidates,
    selectedFriend,
    toggleFriend,
    register,
    errors,
    submitAdd,
    addActions,
  } = useLogic();

  return (
    <>
      <Dialog
        header={t('startpage.sharings.header')}
        isActive={isOpen}
        onClose={onClose}
      >
        <div className={css.container}>
          <div className={css.section}>
            <div className={css.sectionHeader}>
              <div className={css.sectionTitle}>
                {t('startpage.sharings.continuous.title')}
              </div>
              <Button
                kind='ghost'
                className={css.addButton}
                label={t('startpage.sharings.continuous.add.action')}
                onClick={openAdd}
              />
            </div>
            {continuousFriends?.length ? (
              continuousFriends.map((friend) => (
                <div className={css.row} key={friend.id}>
                  <div className={css.friendName}>{friend.email}</div>
                  <Button
                    kind='ghost'
                    className={css.cancelButton}
                    onClick={() => setCancelTarget(friend)}
                  >
                    {t('startpage.sharings.continuous.cancel')}
                  </Button>
                </div>
              ))
            ) : (
              <div className={css.emptyState}>
                {t('startpage.sharings.empty')}
              </div>
            )}
          </div>

          <div className={css.section}>
            <div className={css.sectionTitle}>
              {t('startpage.sharings.recipients.title')}
            </div>
            {recipients?.length ? (
              recipients.map((friend) => (
                <div className={css.friendBlock} key={friend.friend.id}>
                  <div className={css.friendName}>{friend.friend.email}</div>
                  {friend.recipes.length ? (
                    friend.recipes.map((recipe) => (
                      <div className={css.recipeRow} key={recipe.id}>
                        <div className={css.recipeName}>{recipe.name}</div>
                        <Button
                          kind='ghost'
                          label='Удалить доступ'
                          className={css.removeButton}
                          onClick={() =>
                            setRemoveTarget({
                              recipe,
                              email: friend.friend.email,
                            })
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <div className={css.emptyState}>
                      {t('startpage.sharings.empty')}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={css.emptyState}>
                {t('startpage.sharings.empty')}
              </div>
            )}
          </div>
        </div>
      </Dialog>

      <Dialog
        header={t('startpage.sharings.continuous.add.header')}
        isActive={addOpen}
        onClose={closeAdd}
      >
        <form onSubmit={submitAdd} className={css.addForm}>
          {!selectedFriend && (
            <Field
              key='email'
              name='email'
              type='email'
              register={register}
              label={t('startpage.sharings.continuous.add.newFriend')}
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
              {candidates?.length ? (
                candidates.map((friend) => (
                  <Button
                    key={friend.id}
                    className={css.friend({
                      selected: selectedFriend?.id === friend.id,
                    })}
                    label={friend.email}
                    onClick={() => toggleFriend(friend)}
                  />
                ))
              ) : (
                <div className={css.emptyState}>
                  {t('features.dropdown.emptyState.text')}
                </div>
              )}
            </div>
          </div>

          <ActionBar actions={addActions} className={css.actions} />
        </form>
      </Dialog>

      <Dialog
        header={t('startpage.sharings.cancelConfirm.title')}
        isActive={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
      >
        <div>{t('startpage.sharings.cancelConfirm.description')}</div>
        <ActionBar
          className={css.actions}
          actions={[
            {
              kind: 'ghost',
              label: t('startpage.sharings.cancelConfirm.back'),
              onClick: () => setCancelTarget(null),
            },
            {
              kind: 'primary',
              label: t('startpage.sharings.cancelConfirm.keepShared'),
              onClick: cancelKeepShared,
              isLoading: cancelling,
            },
            {
              kind: 'accent',
              label: t('startpage.sharings.cancelConfirm.unshareAll'),
              onClick: cancelUnshareAll,
              isLoading: cancelling,
            },
          ]}
        />
      </Dialog>

      <Dialog
        header={t('startpage.sharings.removeConfirm.title')}
        isActive={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
      >
        <div>{t('startpage.sharings.removeConfirm.description')}</div>
        <ActionBar
          className={css.actions}
          actions={[
            {
              kind: 'secondary',
              label: t('modals.confirmation.actions.cancel.label'),
              onClick: () => setRemoveTarget(null),
            },
            {
              kind: 'primary',
              label: t('startpage.sharings.removeConfirm.confirm'),
              onClick: confirmRemove,
              isLoading: removing,
            },
          ]}
        />
      </Dialog>
    </>
  );
};
