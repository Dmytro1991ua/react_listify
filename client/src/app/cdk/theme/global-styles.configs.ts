import { grey } from '@mui/material/colors';

export const GLOBAL_STYLES_CONFIGS = {
  html: {
    height: '100%',
    /* 62.5% of 16px browser font size is 10px */
    fontSize: '62.5%',
    scrollBehavior: 'smooth',
  },
  body: {
    fontSize: '1.6rem',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    boxSizing: 'border-box',
    '&::-webkit-scrollbar': {
      backgroundColor: grey[300],
      width: '0.7rem',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      minHeight: 24,
      backgroundColor: grey[500],
    },
    '&::-webkit-scrollbar-thumb:focus': {
      backgroundColor: grey[600],
    },
    '&::-webkit-scrollbar-thumb:active': {
      backgroundColor: grey[600],
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: grey[600],
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  },
  a: {
    textDecoration: 'none',
    display: 'inline-block',
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
  },
  figure: {
    margin: 0,
  },
};
