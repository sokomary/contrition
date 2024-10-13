import React from 'react';
import { Button, Loading } from 'src/components/features';
import * as css from './ControlCard.css';

type ControlCardItem = {
  id: number;
  name: string;
};

type Props = {
  addButtonText: string;
  header: string;
  items: ControlCardItem[];
  onAddClick: () => void;
  onOpenClick?: (item: { id: number }) => void;
  isLoading: boolean;
  className?: string;
};

export const ControlCard = (props: Props) => (
  <div className={`${props.className}`}>
    <div className={css.control}>
      <div className={css.controlContent}>
        <div className={css.controlHeader}>
          <div className={css.controlName}>{props.header}</div>
          <div className={css.dotsDivider} />
          <div>{props.items.length}</div>
          {props.isLoading && <Loading />}
        </div>
        <Button
          kind="ghost"
          className={css.controlAddButton}
          onClick={props.onAddClick}
        >
          {props.addButtonText}
        </Button>
      </div>
      <div className={css.itemsList}>
        {props.items.map((t, i) => (
          <Button
            className={css.itemName}
            onClick={() => props.onOpenClick && props.onOpenClick(t)}
            key={i}
          >
            {t.name}
          </Button>
        ))}
      </div>
    </div>
  </div>
);
