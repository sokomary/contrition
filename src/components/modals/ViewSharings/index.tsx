import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar, Button, Dialog, Field } from 'src/components/features';
import { useLogic } from './useLogic';
import * as css from './index.css';

export const ViewSharings = () => {
  const { t } = useTranslation();
  const continuousTitleId = useId();
  const recipientsTitleId = useId();
  const friendsLabelId = useId();
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
          <section className={css.section} aria-labelledby={continuousTitleId}>
            <div className={css.sectionHeader}>
              <h5 className={css.sectionTitle} id={continuousTitleId}>
                {t('startpage.sharings.continuous.title')}
              </h5>
              <Button
                kind='ghost'
                className={css.addButton}
                label={t('startpage.sharings.continuous.add.action')}
                onClick={openAdd}
              />
            </div>
            {continuousFriends?.length ? (
              <ul className={css.section}>
                {continuousFriends.map((friend) => (
                  <li className={css.row} key={friend.id}>
                    <span className={css.friendName}>{friend.email}</span>
                    <Button
                      kind='ghost'
                      className={css.cancelButton}
                      onClick={() => setCancelTarget(friend)}
                    >
                      {t('startpage.sharings.continuous.cancel')}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={css.emptyState}>{t('startpage.sharings.empty')}</p>
            )}
          </section>

          <section className={css.section} aria-labelledby={recipientsTitleId}>
            <h5 className={css.sectionTitle} id={recipientsTitleId}>
              {t('startpage.sharings.recipients.title')}
            </h5>
            {recipients?.length ? (
              <ul className={css.section}>
                {recipients.map((friend) => (
                  <li className={css.friendBlock} key={friend.friend.id}>
                    <h6 className={css.friendName}>{friend.friend.email}</h6>
                    {friend.recipes.length ? (
                      <ul className={css.friendBlock}>
                        {friend.recipes.map((recipe) => (
                          <li className={css.recipeRow} key={recipe.id}>
                            <span className={css.recipeName}>
                              {recipe.name}
                            </span>
                            <Button
                              kind='ghost'
                              label={t('startpage.sharings.recipients.remove')}
                              className={css.removeButton}
                              onClick={() =>
                                setRemoveTarget({
                                  recipe,
                                  email: friend.friend.email,
                                })
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={css.emptyState}>
                        {t('startpage.sharings.empty')}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={css.emptyState}>{t('startpage.sharings.empty')}</p>
            )}
          </section>
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
            />
          )}

          {!!candidates?.length && (
            <section aria-labelledby={friendsLabelId}>
              <h5 className={css.label} id={friendsLabelId}>
                {t('startpage.recipes.share.friends')}
              </h5>

              <div className={css.friends}>
                {candidates.map((friend) => (
                  <Button
                    key={friend.id}
                    className={css.friend({
                      selected: selectedFriend?.id === friend.id,
                    })}
                    label={friend.email}
                    onClick={() => toggleFriend(friend)}
                  />
                ))}
              </div>
            </section>
          )}

          <ActionBar actions={addActions} className={css.actions} />
        </form>
      </Dialog>

      <Dialog
        header={t('startpage.sharings.cancelConfirm.title')}
        isActive={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
      >
        <p>{t('startpage.sharings.cancelConfirm.description')}</p>
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
        <p>{t('startpage.sharings.removeConfirm.description')}</p>
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
