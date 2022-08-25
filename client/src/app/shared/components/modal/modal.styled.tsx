import { Dialog, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import Button from '../button/button';

export const DialogContainer = styled(Dialog)`
  & .MuiPaper-root {
    &.MuiDialog-paper {
      position: relative;
      width: 100%;
      max-width: 60rem;
      height: auto;
      align-items: center;
      justify-content: center;
      padding: 2.8rem 1.6rem;
      margin: 0;
      border: ${({ theme }) => `3px solid ${theme.palette.success.dark}`};
    }
  }
`;

export const DialogTitle = styled('h3')`
  ${({ theme }) => theme.typography.h4};
  margin-bottom: ${({ theme }) => theme.spacing(16)};
  margin-top: 0;
`;

export const DialogCloseBtn = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const DialogCloseIcon = styled(AiOutlineCloseCircle)`
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.palette.success.dark};
`;

export const DialogContent = styled('div')`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(30)};
`;

export const DialogActionsContainer = styled(DialogActions, { shouldForwardProp: (prop) => prop !== 'fullWidth' })<{
  fullWidth?: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  justify-content: center;
  padding: 0;
  height: 40px;

  &.MuiDialogActions-root > :not(:first-of-type) {
    margin-left: ${({ theme }) => theme.spacing(24)};
  }
`;
