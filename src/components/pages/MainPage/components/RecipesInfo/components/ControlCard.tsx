import React from 'react';
import { Button, Loading } from 'src/components/features';
import i18next from 'src/formatter';
import { useToggleModal } from 'src/components/modals';
import * as css from './ControlCard.css';

type ControlCardItem = {
  id: number;
  name: string;
};

type Props = {
  type: 'tag' | 'product';
  items: ControlCardItem[];
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
            <Item item={item} key={index} openable={props.type === 'product'} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Item = ({
  item,
  openable,
}: {
  item: ControlCardItem;
  openable?: boolean;
}) => {
  const { open } = useToggleModal('product-info', item.id.toString());
  return (
    <Button className={css.itemName} onClick={() => (openable ? open() : {})}>
      {item.name}
    </Button>
  );
};
