import { Grid, styled } from '@mui/material';

export const AuthLayoutContainer = styled(Grid)`
  height: 100vh;
`;

export const AuthFormWrapper = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing(20)} ${theme.spacing(50)}`};
`;

export const AuthFormHeader = styled('header')`
  margin-bottom: ${({ theme }) => theme.spacing(40)};

  h2 {
    font-size: 5.5rem;
    font-weight: bold;
  }

  svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  p {
    font-size: 1.8rem;
    opacity: 0.7;
    margin: 0;
    text-align: center;
  }
`;
