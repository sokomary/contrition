import React from 'react';
import { Button, Loading } from 'src/components/features';
import { useToggleModal } from 'src/hooks';
import i18next from 'src/formatter';
import * as css from './ControlCard.css';

type ControlCardItem = {
  id: number;
  name: string;
};

type Props = {
  type: 'tag' | 'product';
  items: ControlCardItem[];
  onOpenClick?: (item: { id: number }) => void;
  isLoading: boolean;
  className?: string;
};

export const ControlCard = (props: Props) => {
  const { open } = useToggleModal(`${props.type}-new`, 'true');

  return (
    <div className={`${props.className}`}>
      <div className={css.control}>
        <div className={css.controlContent}>
          <div className={css.controlHeader}>
            <div className={css.controlName}>
              {i18next.t(`startpage:${props.type}s.title`)}
            </div>
            <div className={css.dotsDivider} />
            <div>{props.items.length}</div>
            {props.isLoading && <Loading />}
          </div>

          <Button kind="ghost" className={css.controlAddButton} onClick={open}>
            {i18next.t(`startpage:${props.type}s.actions.add`)}
          </Button>
        </div>

        <div className={css.itemsList}>
          {props.items.map((item, index) => (
            <Button
              className={css.itemName}
              onClick={() => props.onOpenClick && props.onOpenClick(item)}
              key={index}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
