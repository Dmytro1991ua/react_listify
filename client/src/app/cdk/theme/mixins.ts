import { CSSObject, Theme } from '@mui/material/styles';
import { MixinsOptions } from '@mui/material/styles/createMixins';

export const MIXINS_OPTIONS: MixinsOptions = {
  commonBoxShadowMixin: {
    boxShadow: '0 16px 32px 0 rgba(15, 65, 107, 8%), 0 2px 8px 0 rgba(15, 65, 107, 9%)',
  },
  buttonBoxShadowMixin: {
    boxShadow: 'inset 0 -2px 0 0 rgba(35, 31, 32, 0.15)',
  },
  transparentButtonShadowMixin: {
    boxShadow: 'inset 0 0 6px 0 rgba(0, 0, 0, 0.12)',
  },
  switcherBoxShadowMixin: {
    boxShadow: '0 4px 8px 0 rgba(35, 31, 32, 0.25), 0 2px 8px 0 rgba(35, 31, 32, 0.1)',
  },
  formBoxShadowMixin: {
    boxShadow: '2px 4px 4px -1px rgb(0 0 0 / 68%)',
  },
  textInputCommonStylesMixin: (theme: Theme): CSSObject => ({
    ['& .MuiOutlinedInput-root']: {
      color: theme.palette.grey[700],
      backgroundColor: theme.palette.grey[300],
      ...theme.typography.h5,
      ['&:hover']: {
        backgroundColor: theme.palette.grey[400],
        fieldset: {
          border: 'solid 1.5px rgba(116, 123, 153, 0.2)',
        },
      },
      ['& input']: {
        borderRadius: '3px',
        padding: `${theme.spacing(10)} ${theme.spacing(16)}`,
        ['&:disabled']: {
          cursor: 'not-allowed',
        },
      },
      ['input:-webkit-autofill']: {
        WebkitBoxShadow: `0 0 0 30px ${theme.palette.grey[300]} inset`,
        // Delays all styles for input:-webkit-autofill to be in sync with input background styles
        transition: 'all 0s 5000s',
      },
      ['& fieldset']: {
        border: 'solid 1.5px rgba(116, 123, 153, 0.2)',
      },
      ['&.Mui-focused']: {
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
        fieldset: {
          border: `2px solid ${theme.palette.success.dark}`,
        },
      },
      ['&.Mui-disabled']: {
        opacity: 0.4,
        backgroundColor: theme.palette.grey[300],
        fieldset: {
          border: 'solid 1.5px rgba(116, 123, 153, 0.2)',
        },
      },
      ['& svg']: {
        color: theme.palette.grey[600],
        width: '2rem',
        height: '2rem',
      },
    },
    ['& .MuiSelect-select']: {
      padding: `${theme.spacing(12)} ${theme.spacing(16)}`,
      ...theme.typography.h5,
    },
    ['& label']: {
      ...theme.typography.h6,
      fontWeight: 600,
      lineHeight: 1.2,
      opacity: 0.6,

      ['&.Mui-focused']: {
        color: theme.palette.grey[700],
      },
    },
  }),
  textInputCommonErrorsStylesMixin: (theme: Theme): CSSObject => ({
    ['& .MuiOutlinedInput-root']: {
      ['&.Mui-error']: {
        backgroundColor: '#fbdee1',

        fieldset: {
          border: `1.5px solid ${theme.palette.error.main}`,
        },
      },
    },

    ['& .MuiFormHelperText-root']: {
      margin: `${theme.spacing(4)} ${theme.spacing(0)} ${theme.spacing(0)}`,
      ...theme.typography.subtitle1,

      ['&.Mui-error']: {
        bottom: theme.spacing(-16),
        color: theme.palette.error.main,
      },
    },
  }),
};
