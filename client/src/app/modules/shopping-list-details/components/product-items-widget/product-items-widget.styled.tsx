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
  width: 83%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.success.dark};
  padding: ${({ theme }) => theme.spacing(18)};
  border: ${({ theme }) => `3px solid ${theme.palette.common.black}`};
  ${({ theme }) => theme.mixins.formBoxShadowMixin};

  @media (width >= 48em) {
    width: 50%;
    padding: ${({ theme }) => theme.spacing(25)};
  }
`;

export const Title = styled(Typography)`
  font-size: clamp(1.6rem, -0.875rem + 8.5vw, 2rem);
  margin: 0;
`;
