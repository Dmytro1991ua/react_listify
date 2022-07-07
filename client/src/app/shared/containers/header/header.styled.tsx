import { AppBar, Menu, Typography, styled } from '@mui/material';
import { FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled(AppBar)`
  padding: ${({ theme }) => `${theme.spacing(0)} ${theme.spacing(16)}`};
  background-color: ${({ theme }) => theme.palette.success.dark};
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

export const Logo = styled(Link)`
  display: flex;
  color: ${({ theme }) => theme.palette.common.white};
  cursor: pointer;
`;

export const LogoTitle = styled(Typography)`
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing(5)};
`;

export const LogoIcon = styled(FaLeaf)`
  width: 2rem;
  height: 2rem;
`;

export const ProfileImage = styled('img')`
  width: 5rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.palette.grey[300]};
  border-radius: 50%;
  cursor: pointer;
`;

export const DropdownMenu = styled(Menu)`
  & .MuiPopover-paper {
    margin-top: ${({ theme }) => theme.spacing(12)};
  }

  & .MuiMenu-list {
    background-color: ${({ theme }) => theme.palette.success.dark};
    color: ${({ theme }) => theme.palette.common.white};

    li {
      display: flex;
      justify-content: center;
      font-size: 1.5rem;
      min-width: 15rem;
    }
  }
`;
