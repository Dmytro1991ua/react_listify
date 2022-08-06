import { styled } from '@mui/material';

import NotFoundImageBig from '../../../assets/images/not-found-big.jpg';
import NotFoundImageSmall from '../../../assets/images/not-found-small.jpg';

export const NotFoundPageWrapper = styled('section')`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${NotFoundImageSmall});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media only screen and (min-resolution: 192dpi) and (min-width: 37.9em),
    (min-width: 125em),
    only screen and (min-resolution: 2dppx) and (min-width: 37.9em),
    only screen and (min-width: 125em) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${NotFoundImageBig});
  }
`;
