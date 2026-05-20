export const ru = {
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
      portionSize: 'Количество порций',
      photo: 'Фото',
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
        products:
          'Выберите хотя бы 1 продукт и для каждого продукта укажите количество',
        tags: 'Выберите хотя бы 1 тэг',
      },
    },
    products: {
      title: 'Продукты',
      new: {
        header: 'Новый продукт',
      },
      actions: {
        add: 'Добавить продукт',
      },
    },
    tags: {
      title: 'Тэги',
      new: {
        header: 'Новый тэг',
      },
      actions: {
        add: 'Добавить тэг',
      },
    },
  },
  features: {
    dropdown: {
      emptyState: {
        text: 'Ничего не найдено',
      },
    },
    datePicker: {
      label: 'Выберите дату',
    },
    periodPicker: {
      label: 'Выберите период',
    },
  },
  errors: {
    fields: {
      required: {
        text: 'Обязательное поле',
      },
    },
  },
  modals: {
    confirmation: {
      actions: {
        cancel: {
          label: 'Отмена',
        },
      },
    },
  },
  voc: {
    all: 'Все',
    min: 'Мин.',
    max: 'Макс.',
    of: 'от',
    period: 'Период',
    add: 'Добавить',
    from: 'от',
    till: 'до',
    to: 'до',
    random: 'Случайный',
  },
  weekdays: {
    monday: { label: 'Понедельник', labelShort: 'Пон' },
    tuesday: { label: 'Вторник', labelShort: 'Вт' },
    wednesday: { label: 'Среда', labelShort: 'Ср' },
    thursday: { label: 'Четверг', labelShort: 'Чт' },
    friday: { label: 'Пятница', labelShort: 'Пт' },
    saturday: { label: 'Суббота', labelShort: 'Сб' },
    sunday: { label: 'Воскресенье', labelShort: 'Вс' },
  },
} as const;
