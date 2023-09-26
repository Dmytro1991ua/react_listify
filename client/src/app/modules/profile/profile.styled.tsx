import { Typography, styled } from '@mui/material';

export const SectionContentWrapper = styled('div')`
  max-height: 54rem;
  overflow-y: auto;
  padding: ${({ theme }) => `${theme.spacing(0)}`};

  @media (width >= 80em) {
    padding: ${({ theme }) => `${theme.spacing(0)} ${theme.spacing(60)}`};
  }
`;

export const ProfileAccountSettingsWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'hasEmailAndPasswordProvider',
})<{ hasEmailAndPasswordProvider?: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: ${({ hasEmailAndPasswordProvider }) => (hasEmailAndPasswordProvider ? 'flex-start' : 'center')};
  grid-gap: 2rem;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(20)};

  @media (width >= 80em) {
    grid-template-columns: ${({ hasEmailAndPasswordProvider }) => (hasEmailAndPasswordProvider ? '1fr 1fr' : '1fr')};
  }
`;

export const BlockTitle = styled(Typography)`
  font-size: clamp(2.2rem, -1.875rem + 8.5vw, 3rem);
  font-weight: 600;
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  text-align: center;
`;

export const CommonProfileBlock = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  border-radius: ${({ theme }) => theme.spacing(10)};
  padding: ${({ theme }) => theme.spacing(16)};
  background-color: ${({ theme }) => theme.palette.common.white};
  ${({ theme }) => theme.mixins.formBoxShadowMixin};
`;

export const CommonProfileBlockTitle = styled(Typography)`
  font-size: clamp(1.5rem, -1.875rem + 8.5vw, 2rem);
  font-weight: 600;
  text-align: center;
  padding-bottom: 0.8rem;
  margin-bottom: 2rem;
  border-bottom: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
`;

export const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  width: 100%;

  @media (width >= 80em) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1.6rem;
  }
`;

export const CommonFormWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
