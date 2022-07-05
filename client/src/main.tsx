import { CssBaseline, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { CUSTOM_THEME } from './app/cdk/theme/theme';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={CUSTOM_THEME}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
