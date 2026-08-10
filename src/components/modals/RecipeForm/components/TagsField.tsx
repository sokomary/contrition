import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionBar, Button, FieldError } from 'src/components/features';
import { find } from 'lodash';
import { Options, useLogic } from './TagsField.useLogic';
import * as css from './TagsField.css';

export const TagsField = (props: Options) => {
  const { t } = useTranslation();
  const { fields, remove, tags, append, actions, error } = useLogic(props);
  const labelId = useId();

  return (
    <section className={css.container} aria-labelledby={labelId}>
      <div className={css.header}>
        <h3 className={css.label} id={labelId}>
          {t('domain.recipe.tags')}
        </h3>
        <ActionBar actions={actions} />
      </div>

      <ul className={css.content}>
        {fields.map((tag, index) => (
          <li key={tag.id}>
            <Button
              className={css.tag({ selected: true })}
              aria-pressed={true}
              onClick={() => remove(index)}
            >
              #{tag.name}
            </Button>
          </li>
        ))}

        {tags
          ?.filter((unselected) => !find(fields, unselected))
          .map((tag) => (
            <li key={tag.id}>
              <Button
                className={css.tag({ selected: false })}
                aria-pressed={false}
                onClick={() => append(tag)}
              >
                #{tag.name}
              </Button>
            </li>
          ))}
      </ul>

      {error && <FieldError text={t('startpage.recipes.errors.tags')} />}
    </section>
  );
};
