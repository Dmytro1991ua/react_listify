import { ButtonProps } from '@mui/material';
import { green, grey, purple } from '@mui/material/colors';

import { MIXINS_OPTIONS } from './mixins';

export const CUSTOM_BUTTON_CONFIGS = [
  {
    props: { variant: 'primaryContained' } as ButtonProps,
    style: {
      backgroundColor: green[900],
      color: '#fff',
      padding: '1rem 3rem',
      ...MIXINS_OPTIONS.buttonBoxShadowMixin,
      ['&:hover']: {
        backgroundColor: green[700],
      },
      ['&:active']: {
        backgroundColor: green[800],
        boxShadow: 'none',
      },
      ['&:disabled']: {
        backgroundColor: green[900],
        color: '#fff',
      },
    },
  },
  {
    props: { variant: 'secondaryContained' } as ButtonProps,
    style: {
      color: '#fff',
      backgroundColor: purple[900],
      padding: '1rem 3rem',
      ...MIXINS_OPTIONS.buttonBoxShadowMixin,
      ['&:hover']: {
        backgroundColor: purple[600],
      },
      ['&:active']: {
        backgroundColor: purple[700],
        boxShadow: 'none',
      },
      ['&:disabled']: {
        color: purple[900],
      },
    },
  },
  {
    props: { variant: 'primaryOutlined' } as ButtonProps,
    style: {
      color: green[900],
      padding: '1rem 3rem',
      border: `1px solid ${green[900]}`,
      ['&:hover']: {
        backgroundColor: green[100],
        ...MIXINS_OPTIONS.buttonBoxShadowMixin,
      },
      ['&:active']: {
        backgroundColor: green[100],
      },
      ['&:disabled']: {
        backgroundColor: green[900],
        color: '#fff',
      },
    },
  },
  {
    props: { variant: 'secondaryOutlined' } as ButtonProps,
    style: {
      color: purple[900],
      padding: '1rem 3rem',
      border: `1px solid ${purple[900]}`,
      ['&:hover']: {
        backgroundColor: purple[100],
        ...MIXINS_OPTIONS.buttonBoxShadowMixin,
      },
      ['&:active']: {
        backgroundColor: purple[200],
      },
      ['&:disabled']: {
        color: purple[900],
      },
    },
  },
  {
    props: { variant: 'transparent' } as ButtonProps,
    style: {
      backgroundColor: 'transparent',
      padding: '1.2rem',
      ['&:hover']: {
        backgroundColor: grey[300],
        ...MIXINS_OPTIONS.transparentButtonShadowMixin,
      },
      ['&:active']: {
        ...MIXINS_OPTIONS.transparentButtonShadowMixin,
      },
      ['&:disabled']: {
        backgroundColor: 'transparent',
      },
    },
  },
  {
    props: { variant: 'raised' } as ButtonProps,
    style: {
      backgroundColor: '#fff',
      padding: '7px',
      ...MIXINS_OPTIONS.commonBoxShadowMixin,
      border: `2px solid ${purple[900]}`,
      ['&:hover']: {
        backgroundColor: grey[200],
        path: {
          fill: green[900],
        },
      },
      ['&:active']: {
        boxShadow: 'none',
      },
    },
  },
];
