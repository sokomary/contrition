import React, { useEffect, useRef, useState } from 'react';
import { Recipe } from 'src/types/domain';
import { ActionBar, Button } from 'src/components/features';
import { useRecipeActions } from 'src/components/atoms/useRecipeActions';
import * as css from './Actions.css';

type Props = {
  recipe: Recipe;
};

export const Actions = ({ recipe }: Props) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const actions = useRecipeActions({ recipe });

  return (
    <div ref={menuRef} className={css.container}>
      <Button
        kind="ghost"
        onClick={toggleMenu}
        className={css.dots}
        key={recipe.id}
      >
        <div className={css.dot} />
        <div className={css.dot} />
        <div className={css.dot} />
      </Button>

      {open && <ActionBar className={css.actions} actions={actions} />}
    </div>
  );
};
