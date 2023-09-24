import { Grid, styled } from '@mui/material';

export const AuthLayoutContainer = styled(Grid)`
  height: 100vh;
`;

export const AuthImagePreviewWrapper = styled(Grid)`
  @media (width >= 62em) {
    flex: 0 1 50%;
    max-width: 50%;
  }
`;

export const AuthFormWrapper = styled(Grid)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => `0 ${theme.spacing(16)}`};

  @media (width >= 62em) {
    position: relative;
    flex: 0 1 50%;
    max-width: 50%;
    padding: ${({ theme }) => `${theme.spacing(20)} ${theme.spacing(50)}`};
  }
`;

export const AuthFormHeader = styled('header')`
  margin-bottom: ${({ theme }) => theme.spacing(40)};

  h2 {
    font-size: 5.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.common.white};

    @media (width >= 62em) {
      color: ${({ theme }) => theme.palette.common.black};
    }
  }

  svg {
    width: 3.2rem;
    height: 3.2rem;
    fill: ${({ theme }) => theme.palette.common.white};

    @media (width >= 62em) {
      fill: ${({ theme }) => theme.palette.common.black};
    }
  }

  p {
    font-size: 1.8rem;
    opacity: 0.7;
    margin: 0;
    text-align: center;
    color: ${({ theme }) => theme.palette.common.white};

    @media (width >= 62em) {
      color: ${({ theme }) => theme.palette.common.black};
    }
  }
`;
