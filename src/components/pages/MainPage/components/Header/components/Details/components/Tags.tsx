import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useToggleModal } from 'src/components/modals';
import { getTags } from 'src/api';
import { Card } from './Card';
import * as css from './Tags.css';

export const Tags = () => {
  const { t } = useTranslation();
  const { open: openAddTag } = useToggleModal(`tag-new`, 'true');
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });

  return (
    <Card
      title={t('startpage.tags.title')}
      items={(tags || []).map((tag) => (
        <div className={css.item} key={tag.id}>
          {tag.name}
        </div>
      ))}
      className={css.container}
      actions={[
        {
          label: t('startpage.tags.actions.add'),
          onClick: openAddTag,
          kind: 'ghost',
        },
      ]}
    />
  );
};
