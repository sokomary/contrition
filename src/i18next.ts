import i18next from 'i18next';

i18next.init({
  fallbackLng: 'ru',
  resources: {
    ru: {
      domain: {
        recipe: {
          name: 'Название',
          link: 'Ссылка',
          calories: 'Калории',
          protein: 'Белки',
          fats: 'Жиры',
          carbohydrates: 'Углеводы',
        },
      },
      forms: {
        fields: {
          errors: {
            required: 'Это обязательное поле',
          },
        },
      },
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
