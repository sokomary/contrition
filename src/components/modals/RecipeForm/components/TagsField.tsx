import React, { FC } from 'react';
import {
  useController, UseControllerProps, useFieldArray,
} from 'react-hook-form';
import { Recipe } from 'src/domain';
import { Button, FieldError } from 'src/components/features';
import i18next from 'src/formatter';
import { find } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { getTags } from 'src/api';
import * as css from './TagsField.css';

type Props = {
  onNewClick: () => void;
};

export const TagsField: FC<UseControllerProps<Recipe> & Props> = (props) => {
  const { data: tags } = useQuery({ queryKey: ['tags'], queryFn: () => getTags() });

  const { fieldState } = useController(props);

  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: 'tags',
    keyName: 'key',
    rules: {
      validate: (v) => (v as any[]).length !== 0,
    },
  });

  return (
    <div className={css.container}>
      <div className={css.styledContainer}>
        {fields
          .map((t, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div className={css.tag({ selected: true })} key={t.id} onClick={() => remove(index)}>
              #
              {t.name}
            </div>
          ))}
        {tags?.filter((unselected) => !find(fields, unselected))
          .map((t) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div key={t.id} className={css.tag({ selected: false })} onClick={() => append(t)}>
              #
              {t.name}
            </div>
          ))}
      </div>
      {fieldState.error && <FieldError text={i18next.t('startpage:recipes.errors.tags')} />}
      <Button kind="ghost" className={css.button} onClick={props.onNewClick}>
        {i18next.t('startpage:recipes.actions.addTag')}
      </Button>
    </div>
  );
};
