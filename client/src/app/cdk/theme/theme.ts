import { createTheme } from '@mui/material/styles';

import { CUSTOM_BUTTON_CONFIGS } from './button.configs';
import { GLOBAL_STYLES_CONFIGS } from './global-styles.configs';

export const CUSTOM_THEME = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: GLOBAL_STYLES_CONFIGS,
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      variants: CUSTOM_BUTTON_CONFIGS,
    },
  },
  typography: {
    fontFamily: '"Inter-Regular", sans-serif',
  },
  /**
   * Spacing ration. Ratio: 1 = 1px
   * @example theme.spacing(16) = 16px
   */
  spacing: 1,
});
