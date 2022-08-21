import { Typography, styled } from '@mui/material';

export const FallbackMessageWrapper = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  min-width: 30rem;
  max-width: 70rem;
  background-color: ${({ theme }) => theme.palette.common.white};
  border: ${({ theme }) => `3px solid ${theme.palette.success.dark}`};
  border-radius: ${({ theme }) => theme.spacing(12)};
  padding: ${({ theme }) => `${theme.spacing(30)} ${theme.spacing(16)}`};
  ${({ theme }) => theme.mixins.formBoxShadowMixin}
`;

export const Title = styled(Typography)`
  margin: ${({ theme }) => `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(12)} ${theme.spacing(0)}`};
  font-weight: 600;
  padding-bottom: ${({ theme }) => theme.spacing(5)};
  border-bottom: ${({ theme }) => `1px solid ${theme.palette.success.dark}`};
  text-align: center;
`;

export const Subtitle = styled(Title)`
  opacity: 0.7;
  border-bottom: 0;
  margin: 0;
  text-align: center;
`;
