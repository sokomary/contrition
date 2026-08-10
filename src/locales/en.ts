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
    actions: {
      logout: 'Log out',
    },
    recipes: {
      empty: 'No recipes yet',
      added: 'Recipe added',
      updated: 'Recipe updated',
      removed: 'Recipe deleted',
      random: {
        header: 'Random recipe',
        actions: { get: 'Refresh' },
      },
      new: {
        header: 'New recipe',
      },
      shared: {
        title: 'Shared with me',
      },
      favorites: {
        title: 'Favorite recipes',
        added: 'Recipe added to favorites',
        removed: 'Recipe removed from favorites',
      },
      removeConfirm: {
        title: 'Delete recipe',
        description: 'Are you sure you want to delete this recipe?',
      },
      instructions: {
        title: 'Instructions',
        empty: 'No instructions yet',
        actions: {
          addPart: 'Add part',
          addStep: 'Add step',
        },
      },
      share: {
        header: 'Share recipe',
        newFriend: 'New friend',
        friends: 'Friends',
        success: 'Recipe shared',
        error: 'Failed to share recipe',
        emailPlaceholder: 'Email',
      },
      actions: {
        add: 'Add recipe',
        addProduct: 'Add product',
        addTag: 'Add tag',
        delete: 'Delete',
        edit: 'Edit',
        save: 'Save',
        share: 'Share',
        toFavorites: 'To favorites',
        fromFavorites: 'From favorites',
      },
      errors: {
        products:
          'Select at least 1 product and specify the amount for each product',
        tags: 'Select at least 1 tag',
      },
    },
    sharings: {
      action: 'View sharings',
      header: 'My sharings',
      empty: 'Empty',
      continuous: {
        title: 'Continuous sharing',
        cancel: 'Cancel sharing',
        add: {
          action: 'Share',
          header: 'Continuous sharing',
          newFriend: 'New friend',
          submit: 'Add',
        },
        added: 'Sharing enabled',
      },
      recipients: {
        title: 'Shared recipes',
        remove: 'Stop sharing',
      },
      cancelConfirm: {
        title: 'Cancel continuous sharing',
        description:
          'Cancel continuous sharing? You can keep already shared recipes or unshare all of them.',
        back: 'Back',
        keepShared: 'Cancel and keep shared',
        unshareAll: 'Cancel and unshare all',
      },
      removeConfirm: {
        title: 'Stop sharing recipe',
        description: 'Stop sharing this recipe?',
        confirm: 'Stop sharing',
      },
      removed: 'Sharing removed',
      cancelled: 'Sharing cancelled',
      error: 'Something went wrong',
    },
    products: {
      title: 'Products',
      added: 'Product added',
      new: {
        header: 'New product',
      },
      actions: {
        add: 'Add product',
      },
    },
    tags: {
      title: 'Tags',
      added: 'Tag added',
      new: {
        header: 'New tag',
      },
      actions: {
        add: 'Add tag',
      },
    },
    menu: {
      title: 'Menu',
      created: 'Menu created',
      actions: {
        add: 'Add menu',
        addRecipe: 'Select',
      },
      selectRecipe: {
        header: 'Select recipe',
      },
      current: {
        empty: 'No current menu',
      },
      history: {
        title: 'History',
        empty: 'History is empty',
      },
      products: {
        title: 'Shopping list',
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
    somethingWentWrong: 'Something went wrong',
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
    new: 'New',
    select: 'Select',
    search: 'Search',
    description: 'Description',
    loading: 'Loading',
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
