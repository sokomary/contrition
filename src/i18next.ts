import i18next from 'i18next';

i18next.init({
  fallbackLng: 'ru',
  resources: {
    ru: {
      startpage: {
        recipes: {
          new: {
            header: 'Новый рецепт',
          },
          actions: {
            add: 'Добавить рецепт',
            save: 'Сохранить',
          },
        },
      },
    },
  },
});

export default i18next;
