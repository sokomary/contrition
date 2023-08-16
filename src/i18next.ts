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
          tags: 'Тэги',
          recipeProducts: 'Состав',
          carbohydrates: 'Углеводы',
          size: 'Общий вес',
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
            addProduct: 'Добавить продукт',
            addTag: 'Добавить тэг',
            delete: 'Удалить',
            save: 'Сохранить',
          },
          errors: {
            noQuantity: 'Для каждого продукта должно быть указано количество',
          },
        },
        products: {
          new: {
            header: 'Новый продукт',
          },
        },
        tags: {
          new: {
            header: 'Новый тэг',
          },
        },
      },
    },
  },
});

export default i18next;
