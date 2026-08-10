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
    actions: {
      logout: 'Выйти',
    },
    recipes: {
      empty: 'Пока нет рецептов',
      added: 'Рецепт добавлен',
      updated: 'Рецепт обновлен',
      removed: 'Рецепт удален',
      random: {
        header: 'Случайный рецепт',
        actions: { get: 'Обновить' },
      },
      new: {
        header: 'Новый рецепт',
      },
      favorites: {
        title: 'Избранные рецепты',
        added: 'Рецепт добавлен в избранное',
        removed: 'Рецепт удален из избранного',
      },
      removeConfirm: {
        title: 'Удаление рецепта',
        description: 'Вы уверены, что хотите удалить рецепт?',
      },
      instructions: {
        title: 'Приготовление',
        empty: 'Приготовление не описано',
        actions: {
          addPart: 'Добавить часть',
          addStep: 'Добавить шаг',
        },
      },
      share: {
        header: 'Поделиться рецептом',
        newFriend: 'Новый друг',
        friends: 'Друзья',
        success: 'Рецепт отправлен',
        error: 'Не удалось поделиться рецептом',
        emailPlaceholder: 'Электронная почта',
      },
      actions: {
        add: 'Добавить рецепт',
        addProduct: 'Добавить продукт',
        addTag: 'Добавить тэг',
        delete: 'Удалить',
        edit: 'Изменить',
        save: 'Сохранить',
        share: 'Поделиться',
        toFavorites: 'В избранное',
        fromFavorites: 'Из избранного',
      },
      errors: {
        products:
          'Выберите хотя бы 1 продукт и для каждого продукта укажите количество',
        tags: 'Выберите хотя бы 1 тэг',
      },
    },
    sharings: {
      action: 'Доступы',
      header: 'Доступы',
      empty: 'Ни у кого нет доступа',
      continuous: {
        title: 'Постоянный доступ',
        cancel: 'Отменить доступ',
        add: {
          action: 'Поделиться',
          header: 'Постоянный доступ',
          newFriend: 'Новый друг',
          submit: 'Добавить',
        },
        added: 'Доступ открыт',
      },
      recipients: {
        title: 'Открытые рецепты',
        remove: 'Удалить доступ',
      },
      cancelConfirm: {
        title: 'Отмена постоянного доступа',
        description:
          'Отменить постоянный доступ? Можно оставить уже открытые рецепты или закрыть их все.',
        back: 'Назад',
        keepShared: 'Отменить, оставить рецепты',
        unshareAll: 'Отменить и закрыть все',
      },
      removeConfirm: {
        title: 'Закрыть доступ к рецепту',
        description: 'Закрыть доступ к этому рецепту?',
        confirm: 'Закрыть доступ',
      },
      removed: 'Доступ закрыт',
      cancelled: 'Доступ отменен',
      error: 'Что-то пошло не так',
    },
    products: {
      title: 'Продукты',
      added: 'Продукт успешно добавлен',
      new: {
        header: 'Новый продукт',
      },
      actions: {
        add: 'Добавить продукт',
      },
    },
    tags: {
      title: 'Тэги',
      added: 'Тэг успешно добавлен',
      new: {
        header: 'Новый тэг',
      },
      actions: {
        add: 'Добавить тэг',
      },
    },
    menu: {
      title: 'Меню',
      created: 'Меню успешно создано',
      actions: {
        add: 'Добавить меню',
        addRecipe: 'Выбрать',
      },
      selectRecipe: {
        header: 'Выбрать рецепт',
      },
      current: {
        empty: 'Нет текущего меню',
      },
      history: {
        title: 'История',
        empty: 'В истории пока пусто',
      },
      products: {
        title: 'Список продуктов',
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
    somethingWentWrong: 'Что-то пошло не так',
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
    new: 'Новый',
    select: 'Выбрать',
    search: 'Поиск',
    description: 'Описание',
    loading: 'Загрузка',
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
