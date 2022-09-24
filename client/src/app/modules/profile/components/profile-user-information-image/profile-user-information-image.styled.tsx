import { AddAPhoto } from '@mui/icons-material';
import { styled } from '@mui/material';

export const ProfileImageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: inherit;
  width: max-content;
`;

export const ImageWrapper = styled('figure')`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`;

export const ProfileAddButtonIcon = styled(AddAPhoto)`
  position: absolute;
  bottom: 20%;
  right: -5%;
  width: 5rem;
  height: 5rem;
  fill: ${({ theme }) => theme.palette.success.dark};
  transition transform 300ms ease-in-out ;
  cursor: pointer ;

  &:hover {
    transform: scale(1.1) ;
  }
`;