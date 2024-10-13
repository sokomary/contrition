import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Recipe } from 'src/domain';
import { deleteRecipe, fromFavorites, toFavorites } from 'src/api';
import { Confirmation } from 'src/components/modals/Confirmation';
import { Button } from 'src/components/features';
import * as css from './Actions.css';

type Props = {
  recipe: Recipe;
  onEditClick: (recipe: Recipe) => void;
};

export const Actions = ({ recipe, onEditClick }: Props) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });
  const toFavoritesMutation = useMutation({
    mutationFn: toFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
  const fromFavoritesMutation = useMutation({
    mutationFn: fromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setOptionsOpen(!optionsOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOptionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <div ref={menuRef}>
        <Button
          kind="ghost"
          onClick={toggleMenu}
          className={css.dots}
          key={recipe.id}
        >
          <div className={css.dot} />
          <div className={css.dot} />
          <div className={css.dot} />
          {optionsOpen && (
          <div className={css.options}>
            <Button
              kind="ghost"
              className={css.option()}
              onClick={() => {
                onEditClick(recipe);
                toggleMenu();
              }}
            >
              Изменить
            </Button>
            {recipe.favorite
              ? (
                <Button
                  kind="ghost"
                  className={css.option()}
                  onClick={() => {
                    fromFavoritesMutation.mutate(recipe.id);
                    toggleMenu();
                  }}
                >
                  Из избранного
                </Button>
              )
              : (
                <Button
                  kind="ghost"
                  className={css.option()}
                  onClick={() => {
                    toFavoritesMutation.mutate(recipe.id);
                    toggleMenu();
                  }}
                >
                  В избранное
                </Button>
              )}
            <Button
              kind="ghost"
              className={css.option({ negative: true })}
              onClick={() => {
                setConfirmOpen(true);
                toggleMenu();
              }}
            >
              Удалить
            </Button>
          </div>
          )}
        </Button>
      </div>

      {confirmOpen && (
        <Confirmation
          key={recipe.id}
          open={confirmOpen}
          title="Удаление рецепта"
          text="Вы уверены, что хотите удалить рецепт?"
          onClose={(result) => {
            if (result) {
              deleteMutation.mutate(recipe);
            }
            toggleMenu();
          }}
        />
      )}
    </>
  );
};
