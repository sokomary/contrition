import React from 'react';
import { ActionBar, Button, FieldError } from 'src/components/features';
import i18next from 'src/formatter';
import { find } from 'lodash';
import { Options, useLogic } from './TagsField.useLogic';
import * as css from './TagsField.css';

export const TagsField = (props: Options) => {
  const { fields, remove, tags, append, actions, error } = useLogic(props);

  return (
    <div className={css.container}>
      <div className={css.styledContainer}>
        {fields.map((t, index) => (
          <Button
            className={css.tag({ selected: true })}
            key={t.id}
            onClick={() => remove(index)}
          >
            #{t.name}
          </Button>
        ))}

        {tags
          ?.filter((unselected) => !find(fields, unselected))
          .map((t) => (
            <Button
              key={t.id}
              className={css.tag({ selected: false })}
              onClick={() => append(t)}
            >
              #{t.name}
            </Button>
          ))}
      </div>

      {error && (
        <FieldError text={i18next.t('startpage:recipes.errors.tags')} />
      )}
      <ActionBar actions={actions} className={css.actions} />
    </div>
  );
};
