import { Tag } from 'src/domain';
import React, { FC } from 'react';
import { GetRandomRecipe } from 'src/components/dialogs';

type DialogsProps = {
  tags: Tag[];
  randomDialogOpen: boolean;
  setRandomDialogOpen: (value: boolean) => void;
};

export const Dialogs: FC<DialogsProps> = (props) => (
  <>
    {props.randomDialogOpen && (
      <GetRandomRecipe
        tags={props.tags}
        open={props.randomDialogOpen}
        onClose={() => props.setRandomDialogOpen(false)}
      />
    )}
  </>
);
