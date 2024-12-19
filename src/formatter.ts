import i18next from 'i18next';

i18next.init({
  fallbackLng: 'ru',
  resources: {
    ru: {
      loginpage: {
        actions: {
          login: {
            google: 'Войти с помощью Google',
          },
        },
        errors: {
          url: 'Не удалось получить ссылку для входа',
        },
      },
      domain: {
        recipe: {
          name: 'Название',
          link: 'Ссылка',
          calories: 'Калории',
          protein: 'Белки',
          fats: 'Жиры',
          tags: 'Тэги',
          img: 'Имя файла картинки',
          recipeProducts: 'Состав',
          carbohydrates: 'Углеводы',
          size: 'Вес (г)',
          comment: 'Комментарий',
        },
      },
      forms: {
        fields: {
          errors: {
            required: 'Oбязательное поле',
          },
        },
      },
      startpage: {
        recipes: {
          random: {
            header: 'Случайный рецепт',
            actions: { get: 'Обновить' },
          },
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
            products: 'Выберите хотя бы 1 продукт и для каждого продукта укажите количество',
            tags: 'Выберите хотя бы 1 тэг',
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
