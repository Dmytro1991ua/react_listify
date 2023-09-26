import { AppBar, Menu, Typography, styled } from '@mui/material';
import { BiLogOut } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaLeaf } from 'react-icons/fa';
import { MdOpenInNew } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const CommonDropdownMenuIconStyles = `
  fill: #fff;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
}`;

export const HeaderWrapper = styled(AppBar)`
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(16)}`};
  background-color: ${({ theme }) => theme.palette.success.dark};
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  border: none;
`;

export const Logo = styled(Link)`
  display: flex;
  color: ${({ theme }) => theme.palette.common.white};
  cursor: pointer;
`;

export const LogoTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing(5)};
`;

export const LogoIcon = styled(FaLeaf)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const DropdownMenu = styled(Menu)`
  & .MuiPopover-paper {
    margin-top: ${({ theme }) => theme.spacing(18)};
  }

  & .MuiMenu-list {
    background-color: ${({ theme }) => theme.palette.success.dark};
    color: ${({ theme }) => theme.palette.common.white};

    li {
      display: flex;
      justify-content: center;
      font-size: 1.5rem;
      min-width: 15rem;

      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

export const ProfileIcon = styled(CgProfile)`
  ${CommonDropdownMenuIconStyles};
`;

export const LogoutIcon = styled(BiLogOut)`
  ${CommonDropdownMenuIconStyles};
`;

export const OpenIcon = styled(MdOpenInNew)`
  ${CommonDropdownMenuIconStyles};
`;

export const TrashIcon = styled(BsFillTrashFill)`
  ${CommonDropdownMenuIconStyles};
`;
