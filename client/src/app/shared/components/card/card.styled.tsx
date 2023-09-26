import { Card, Typography, styled } from '@mui/material';
import { BsPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';

const commonElementsAlignment = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const commonIconsStyles = `
  width: 1.6rem;
  height: 1.6rem;

  @media (width >= 48em) {
    width: 2rem;
    height: 2rem;
  }
`;

export const CustomCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isShoppingListDetails',
})<{
  isSelected?: boolean;
  isShoppingListDetails?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing(10)};
  background-color: ${({ theme }) => theme.palette.common.white};
  border: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  opacity: ${({ isSelected }) => (isSelected ? 0.5 : 1)};
  text-decoration: ${({ isSelected }) => (isSelected ? 'line-through' : 'none')};
  ${({ theme }) => theme.mixins.formBoxShadowMixin};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing(20)};

  @media (width >= 28em) {
    padding: ${({ theme }) => theme.spacing(20)};
  }

  &:last-of-type {
    margin-bottom: ${({ theme, isShoppingListDetails }) => (isShoppingListDetails ? theme.spacing(90) : 0)};
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

export const CardTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isProductItem',
})<{
  isSelected?: boolean;
  isProductItem?: boolean;
}>`
  margin: 0;
  font-size: clamp(1.5rem, -1.875rem + 8.5vw, 2.4rem);
  font-weight: bold;
  margin-left: ${({ isProductItem }) => (isProductItem ? '1.2rem' : 0)};
`;

export const CardDescriptionWrapper = styled('div')`
  ${commonElementsAlignment}
  margin-left: auto;
  margin-right: ${({ theme }) => theme.spacing(20)};
`;

export const CardDescription = styled(Typography)`
  font-size: clamp(1.3rem, -1.875rem + 8.5vw, 1.8rem);
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
