import { Card, Typography, styled } from '@mui/material';
import { BsPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';

const commonElementsAlignment = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const commonIconsStyles = {
  width: '2rem',
  height: '2rem',
};

export const CustomCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing(20)};
  background-color: ${({ theme }) => theme.palette.common.white};
  border: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  ${({ theme }) => theme.mixins.formBoxShadowMixin};
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(20)};
  }

  header {
    padding: 0;

    & .MuiCardHeader-content {
      display: flex;
      align-items: center;
    }

    & .MuiCardHeader-action {
      align-self: center;
      margin: 0;
    }
  }
`;

export const CardTitle = styled(Typography)`
  margin: 0;
  font-size: ${({ theme }) => theme.spacing(24)};
  font-weight: bold;
`;

export const CardDescriptionWrapper = styled('div')`
  ${commonElementsAlignment}
  margin-left: auto;
  margin-right: ${({ theme }) => theme.spacing(20)};
`;

export const CardDescription = styled(Typography)`
  font-size: ${({ theme }) => theme.spacing(18)};
  margin: 0;

  &:first-of-type {
    margin-right: ${({ theme }) => theme.spacing(16)};
  }
`;

export const CardActions = styled('div')`
  ${commonElementsAlignment}
`;

export const CardActionButton = styled('button')`
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(16)};
  }
`;

export const OpenIcon = styled(FiMoreVertical)`
  ${commonIconsStyles};
`;

export const EditIcon = styled(BsPencilFill)`
  ${commonIconsStyles};
`;

export const DeleteIcon = styled(FaTrashAlt)`
  ${commonIconsStyles};
`;
