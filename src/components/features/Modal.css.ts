import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { MEDIA, color, px } from 'src/theme';

export const container = style({
  margin: '0 !important',
  maxHeight: '85%',

  '@media': {
    [MEDIA.ipadv]: {
      maxHeight: '73%',
    },
    [MEDIA.ipadh]: {
      maxHeight: '100%',
    },
  },
});

const overlayAppearAnimation = keyframes({
  '0%': {
    opacity: 0,
    visibility: 'hidden',
  },
  '100%': {
    opacity: 1,
    visibility: 'visible',
  },
});

const overlayDisappearAnimation = keyframes({
  '0%': {
    opacity: 1,
    visibility: 'visible',
  },
  '100%': {
    opacity: 0,
    visibility: 'hidden',
  },
});

const appearAnimation = (position: 'center' | 'bottom' | 'top' | 'right') => {
  switch (position) {
    case 'right': {
      return keyframes({
        '0%': {
          marginRight: px(-1000),
        },
        '100%': {
          marginRight: '0',
        },
      });
    }

    case 'top': {
      return keyframes({
        '0%': {
          marginTop: px(-1000),
        },
        '100%': {
          marginTop: '0',
        },
      });
    }

    case 'bottom': {
      return keyframes({
        '0%': {
          marginBottom: px(-1000),
        },
        '100%': {
          marginBottom: '0',
        },
      });
    }

    default: {
      return keyframes({
        '0%': {
          opacity: 0.25,
          visibility: 'hidden',
          transform: 'scale(0.95)',
        },
        '100%': {
          opacity: 1,
          visibility: 'visible',
          transform: 'none',
        },
      });
    }
  }
};

const disappearAnimation = keyframes({
  '0%': {
    opacity: 1,
    visibility: 'visible',
    transform: 'none',
  },
  '100%': {
    opacity: 0,
    visibility: 'hidden',
    transform: 'scale(0.95)',
  },
});

export const overlay = recipe({
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    animation: `${overlayAppearAnimation} 300ms ease-out forwards`,
    background: color('bg-overlay'),
  },
  variants: {
    isActive: {
      false: {
        animationName: overlayDisappearAnimation,
      },
    },
  },
});

export const content = recipe({
  base: {
    position: 'fixed',
    margin: 'auto',
    overflow: 'auto',
    animation: `${appearAnimation('center')} 300ms ease-out forwards`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    overlay: {
      true: {
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
      },
      false: {
        right: 0,
        top: 0,
        left: 'auto',
        bottom: 0,
        boxShadow: `0 0 ${px(20)} ${px(5)} rgba(8, 8, 8, 0.10)`,
      },
    },
    isActive: {
      false: {
        animationName: disappearAnimation,
      },
    },
    position: {
      top: { animation: `${appearAnimation('top')} 300ms ease-out forwards` },
      bottom: {
        animation: `${appearAnimation('bottom')} 300ms ease-out forwards`,
      },
      right: {
        animation: `${appearAnimation('right')} 300ms ease-out forwards`,
      },
      center: {
        animation: `${appearAnimation('center')} 300ms ease-out forwards`,
      },
    },
  },
});

export const children = recipe({
  base: {
    backgroundColor: color('basic'),
    alignSelf: 'center',
    justifySelf: 'center',
    borderRadius: px(20),
    padding: px(15),
    display: 'flex',
    flexDirection: 'column',
    gap: px(20),
    overflow: 'scroll',
    width: '100%',

    '@media': {
      [MEDIA.ipadv]: {
        padding: px(15),
      },
      [MEDIA.ipadh]: {
        padding: px(40),
      },
    },
  },
  variants: {
    position: {
      center: {
        marginTop: 'auto',
        marginBottom: 'auto',
      },
      top: {
        width: '100%',
        marginTop: '0',
        marginBottom: 'auto',
        borderRadius: `0 0 ${px(15)} ${px(15)}`,
      },
      right: {
        marginRight: '0',
        marginLeft: 'auto',
        height: '100%',
        overflow: 'scroll',
        borderRadius: '0',
      },
      bottom: {
        marginTop: 'auto',
        marginBottom: 0,
        maxHeight: '80%',
        borderRadius: `${px(15)} ${px(15)} 0 0`,
      },
    },
  },
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontWeight: 'bold',
  fontSize: px(20),
  alignItems: 'flex-start',
});
