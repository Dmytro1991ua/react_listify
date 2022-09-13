import { Typography, styled } from '@mui/material';

export const Widget = styled('section')`
  display: flex;
  justify-content: center;
  margin-top: auto;
  color: ${({ theme }) => theme.palette.common.white};
`;

export const WidgetContentWrapper = styled('div')`
  position: fixed;
  bottom: 0.8%;
  width: 50%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.success.dark};
  padding: ${({ theme }) => theme.spacing(25)};
  border: ${({ theme }) => `3px solid ${theme.palette.common.black}`};
  ${({ theme }) => theme.mixins.formBoxShadowMixin};
`;

export const Title = styled(Typography)`
  margin: 0;
`;
