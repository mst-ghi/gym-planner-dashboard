import { MantineThemeOverride } from '@mantine/core';

export const DefaultTheme: MantineThemeOverride = {
  primaryColor: 'grape',
  black: '#424242',
  white: '#f9f9f9',
  defaultRadius: 'lg',
  other: {},
  components: {
    Loader: {
      defaultProps: {
        type: 'dots',
      },
    },
    Button: {
      defaultProps: {
        variant: 'filled',
      },
    },
    Card: {
      defaultProps: {
        p: 'lg',
        mx: 'sm',
        withBorder: false,
        style: {
          overflow: 'visible',
        },
      },
    },
    TextInput: {
      defaultProps: {},
    },
    Select: {
      defaultProps: {
        maxDropdownHeight: 200,
        searchable: true,
        pointer: true,
        checkIconPosition: 'right',
      },
    },
    Autocomplete: {
      defaultProps: {
        transition: 'pop-top-right',
        maxDropdownHeight: 200,
      },
    },
    PasswordInput: {
      defaultProps: {},
    },
    Textarea: {
      defaultProps: {},
    },
    Checkbox: {
      defaultProps: {
        mt: 20,
      },
    },
    Overlay: {
      defaultProps: {
        blur: 1,
        zIndex: 10,
      },
    },
    ActionIcon: {
      defaultProps: {
        variant: 'filled',
      },
    },
    SimpleGrid: {
      defaultProps: {
        breakpoints: [{ maxWidth: 'sm', cols: 1 }],
      },
    },
    Image: {
      defaultProps: {
        imageProps: {
          loading: 'lazy',
        },
      },
    },
    Menu: {
      defaultProps: {
        shadow: 'md',
        arrowSize: 10,
        withArrow: true,
        withinPortal: true,
      },
    },
    Badge: {
      defaultProps: {},
      styles: {
        root: {
          paddingTop: 2,
        },
        leftSection: {
          marginTop: 4,
        },
      },
    },
    Modal: {
      defaultProps: {
        centered: true,
      },
    },
  },
};
