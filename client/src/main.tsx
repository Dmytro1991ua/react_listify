import { CssBaseline, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import 'react-toastify/dist/ReactToastify.css';
import App from './app/App';
import { CUSTOM_THEME } from './app/cdk/theme/theme';
import { CustomToastContainer } from './assets/styles/toast.styled';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={CUSTOM_THEME}>
      <CssBaseline />
      <App />
      <CustomToastContainer autoClose={1500} closeOnClick={false} hideProgressBar={true} position='top-center' />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
