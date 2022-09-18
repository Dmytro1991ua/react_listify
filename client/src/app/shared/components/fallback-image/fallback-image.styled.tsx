import { styled } from '@mui/material';

import { UserImageSize } from '../../../app.enums';

function userImageSize(size: UserImageSize) {
  switch (size) {
    case UserImageSize.Small:
      return { width: '5rem', height: '5rem' };
    case UserImageSize.Medium:
      return { width: '20rem', height: '20rem' };
    case UserImageSize.Large:
      return { width: '40rem', height: '40rem' };
  }
}

export const UserImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'isUserAuthenticated' && prop !== 'isActive',
})<{ size: UserImageSize; isUserAuthenticated?: boolean; isActive?: boolean }>`
  display: ${({ isUserAuthenticated, size }) =>
    !isUserAuthenticated && size === UserImageSize.Small ? 'none' : 'block'};
  width: ${({ size }) => userImageSize(size).width};
  height: ${({ size }) => userImageSize(size).height};
  margin-right: ${({ size }) => (size === UserImageSize.Small ? '2rem' : 0)};
  background-color: ${({ theme }) => theme.palette.grey[500]};
  border: ${({ theme, isActive }) => (isActive ? `2.5px solid ${theme.palette.common.white}` : 'none')};
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
  cursor: pointer;
`;
