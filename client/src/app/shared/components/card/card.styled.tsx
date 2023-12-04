import { Card, Typography, styled } from '@mui/material';
import { green } from '@mui/material/colors';
import { BsPencilFill } from 'react-icons/bs';
import { FaHeart, FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';

const commonElementsAlignment = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const commonIconsStyles = `
  width: 1.5rem;
  height: 1.5rem;

  @media (width >= 48em) {
    width: 2rem;
    height: 2rem;
  }
`;

export const CustomCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isShoppingListDetails' && prop !== 'isFavorite',
})<{
  isSelected?: boolean;
  isShoppingListDetails?: boolean;
  isFavorite?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing(10)};
  background-color: ${({ theme, isFavorite }) => (isFavorite ? `${green[100]}` : `${theme.palette.common.white}`)};
  border: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  opacity: ${({ isSelected }) => (isSelected ? 0.5 : 1)};
  text-decoration: ${({ isSelected }) => (isSelected ? 'line-through' : 'none')};
  ${({ theme }) => theme.mixins.formBoxShadowMixin};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  transition: all 0.4s ease-in-out;

  @media (width >= 28em) {
    padding: ${({ theme }) => theme.spacing(20)};
  }

  &:last-of-type {
    margin-bottom: ${({ theme, isShoppingListDetails }) => (isShoppingListDetails ? theme.spacing(90) : 0)};
  }

  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;

    @media (width >= 35em) {
      flex-direction: row;
    }

    & .MuiCardHeader-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    & .MuiCardHeader-action {
      align-self: center;
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
  font-size: clamp(1.5rem, -1.875rem + 7.5vw, 2.4rem);
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
    margin-right: ${({ theme }) => theme.spacing(13)};
  }
`;

export const OpenIcon = styled(FiMoreVertical)`
  width: 2rem;
  height: 2rem;

  @media (width >= 48em) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const EditIcon = styled(BsPencilFill)`
  ${commonIconsStyles};
`;

export const DeleteIcon = styled(FaTrashAlt)`
  ${commonIconsStyles};
`;

export const AddToFavorite = styled(FaRegHeart)`
  ${commonIconsStyles}
  fill: ${({ theme }) => theme.palette.success.dark};
`;

export const RemoveFromFavorite = styled(FaHeart)`
  ${commonIconsStyles}
  fill: ${({ theme }) => theme.palette.success.dark};
`;
