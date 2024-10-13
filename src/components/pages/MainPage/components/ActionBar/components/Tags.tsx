import React, { useState } from 'react';
import { Tag } from 'src/domain';
import { Button } from 'src/components/features';
import * as css from './Tags.css';

type Props = {
  tags: Tag[];
  onSelect: (tag?: Tag) => void;
};

export const Tags = (props: Props) => {
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
  const selectTag = (tag: Tag) => {
    const newTag = selectedTag?.id !== tag.id ? tag : undefined;
    setSelectedTag(newTag);
    props.onSelect(newTag);
  };

  return (
    <div className={css.container}>
      {props.tags?.map((t) => (
        <Button
          kind="ghost"
          className={css.name({ selected: selectedTag?.id === t.id })}
          onClick={() => selectTag(t)}
          key={t.id}
        >
          {t.name}
        </Button>
      ))}
    </div>
  );
};
