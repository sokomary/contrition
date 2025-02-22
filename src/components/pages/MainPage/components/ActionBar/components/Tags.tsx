import React from 'react';
import { Tag } from 'src/types/domain';
import { Button } from 'src/components/features';
import { useQuery } from '@tanstack/react-query';
import { getTags } from 'src/api';
import * as css from './Tags.css';

type Props = {
  value: Tag[];
  onChange: (tag: Tag) => void;
};

export const Tags = ({ value, onChange }: Props) => {
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });

  return (
    <div className={css.container}>
      {tags?.map((tag) => (
        <Button
          kind="ghost"
          className={css.tag({ selected: value.includes(tag) })}
          onClick={() => onChange(tag)}
          key={tag.id}
        >
          {tag.name}
        </Button>
      ))}
    </div>
  );
};
