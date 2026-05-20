export const en = {
  loginpage: {
    actions: {
      login: {
        google: 'Sign in with Google',
      },
    },
    errors: {
      url: 'Failed to get sign-in link',
    },
  },
  domain: {
    recipe: {
      name: 'Name',
      link: 'Link',
      calories: 'Calories',
      protein: 'Protein',
      fats: 'Fats',
      tags: 'Tags',
      img: 'Image file name',
      recipeProducts: 'Ingredients',
      carbohydrates: 'Carbohydrates',
      size: 'Weight (g)',
      comment: 'Comment',
      portionSize: 'Servings',
      photo: 'Photo',
    },
  },
  forms: {
    fields: {
      errors: {
        required: 'Required field',
      },
    },
  },
  startpage: {
    recipes: {
      random: {
        header: 'Random recipe',
        actions: { get: 'Refresh' },
      },
      new: {
        header: 'New recipe',
      },
      actions: {
        add: 'Add recipe',
        addProduct: 'Add product',
        addTag: 'Add tag',
        delete: 'Delete',
        save: 'Save',
      },
      errors: {
        products:
          'Select at least 1 product and specify the amount for each product',
        tags: 'Select at least 1 tag',
      },
    },
    products: {
      title: 'Products',
      new: {
        header: 'New product',
      },
      actions: {
        add: 'Add product',
      },
    },
    tags: {
      title: 'Tags',
      new: {
        header: 'New tag',
      },
      actions: {
        add: 'Add tag',
      },
    },
  },
  features: {
    dropdown: {
      emptyState: {
        text: 'Nothing found',
      },
    },
    datePicker: {
      label: 'Select date',
    },
    periodPicker: {
      label: 'Select period',
    },
  },
  errors: {
    fields: {
      required: {
        text: 'Required field',
      },
    },
  },
  modals: {
    confirmation: {
      actions: {
        cancel: {
          label: 'Cancel',
        },
      },
    },
  },
  voc: {
    all: 'All',
    min: 'Min.',
    max: 'Max.',
    of: 'of',
    period: 'Period',
    add: 'Add',
    from: 'from',
    till: 'till',
    to: 'to',
    random: 'Random',
  },
  weekdays: {
    monday: { label: 'Monday', labelShort: 'Mon' },
    tuesday: { label: 'Tuesday', labelShort: 'Tue' },
    wednesday: { label: 'Wednesday', labelShort: 'Wed' },
    thursday: { label: 'Thursday', labelShort: 'Thu' },
    friday: { label: 'Friday', labelShort: 'Fri' },
    saturday: { label: 'Saturday', labelShort: 'Sat' },
    sunday: { label: 'Sunday', labelShort: 'Sun' },
  },
} as const;
