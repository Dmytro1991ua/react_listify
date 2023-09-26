import { Typography, styled } from '@mui/material';

export const FallbackMessageWrapper = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  max-width: 70rem;
  background-color: ${({ theme }) => theme.palette.common.white};
  border: ${({ theme }) => `3px solid ${theme.palette.success.dark}`};
  border-radius: ${({ theme }) => theme.spacing(12)};
  padding: ${({ theme }) => `${theme.spacing(30)} ${theme.spacing(16)}`};
  ${({ theme }) => theme.mixins.formBoxShadowMixin}

  @media(width >= 48em) {
    min-width: 30rem;
  }
`;

export const Title = styled(Typography)`
  margin: ${({ theme }) => `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(12)} ${theme.spacing(0)}`};
  font-size: clamp(2rem, -0.875rem + 8.5vw, 3rem);
  font-weight: 600;
  padding-bottom: ${({ theme }) => theme.spacing(5)};
  border-bottom: ${({ theme }) => `1px solid ${theme.palette.success.dark}`};
  text-align: center;
`;

export const Subtitle = styled(Title)`
  font-size: clamp(1.2rem, -0.875rem + 8.5vw, 1.5rem);
  opacity: 0.7;
  border-bottom: 0;
  margin: 0;
  text-align: center;
`;
