import { Grid, styled } from '@mui/material';

export const AuthLayoutContainer = styled(Grid)`
  min-height: 100vh;
`;

export const AuthImagePreviewWrapper = styled(Grid)`
  @media (width >= 62em) {
    display: flex;
    flex: 0 1 50%;
    max-width: 50%;
  }
`;

export const AuthFormWrapper = styled(Grid)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => `0 ${theme.spacing(16)}`};

  @media (width >= 62em) {
    position: relative;
    flex: 0 1 50%;
    max-width: 50%;
    height: auto;
    padding: ${({ theme }) => `${theme.spacing(20)} ${theme.spacing(50)}`};
  }
`;

export const AuthFormHeader = styled('header')`
  margin-top: ${({ theme }) => theme.spacing(5)};
  margin-bottom: ${({ theme }) => theme.spacing(10)};

  @media (width >= 62em) {
    margin-bottom: ${({ theme }) => theme.spacing(40)};
  }

  h2 {
    font-size: clamp(3rem, -1.875rem + 8.5vw, 5.5rem);
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
    font-size: clamp(1.4rem, -1.875rem + 8.5vw, 1.8rem);
    opacity: 0.7;
    margin: 0;
    text-align: center;
    color: ${({ theme }) => theme.palette.common.white};

    @media (width >= 62em) {
      color: ${({ theme }) => theme.palette.common.black};
    }
  }
`;
