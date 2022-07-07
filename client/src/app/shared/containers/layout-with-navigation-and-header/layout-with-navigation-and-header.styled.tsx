import { styled } from '@mui/material';

export const LayoutContainer = styled('section')`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  color: ${({ theme }) => theme.palette.common.black};
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

export const MainContent = styled('section')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const HeaderSpacer = styled('div')`
  ${({ theme }) => theme.mixins.toolbar};
`;
