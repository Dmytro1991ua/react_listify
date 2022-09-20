import { Typography, styled } from '@mui/material';

export const ProfileAccountSettingsWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'hasEmailAndPasswordProvider',
})<{ hasEmailAndPasswordProvider?: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasEmailAndPasswordProvider }) => (hasEmailAndPasswordProvider ? '1fr 1fr' : '1fr')};
  justify-items: ${({ hasEmailAndPasswordProvider }) => (hasEmailAndPasswordProvider ? 'flex-start' : 'center')};
  grid-gap: 2rem;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(20)};
`;

export const BlockTitle = styled(Typography)`
  font-weight: 600;
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  text-align: center;
`;

export const CommonProfileBlock = styled('div')`
  width: 100%;
  border: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  border-radius: ${({ theme }) => theme.spacing(10)};
  padding: ${({ theme }) => theme.spacing(16)};
  background-color: ${({ theme }) => theme.palette.common.white};
  ${({ theme }) => theme.mixins.formBoxShadowMixin};
`;

export const CommonProfileBlockTitle = styled(Typography)`
  font-weight: 600;
  text-align: center;
  padding-bottom: 0.8rem;
  margin-bottom: 2rem;
  border-bottom: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
`;

export const ContentWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
