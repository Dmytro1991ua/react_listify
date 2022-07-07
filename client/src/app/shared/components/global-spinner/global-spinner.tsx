import { ReactElement } from 'react';

import { Box1, Box2, LoaderContainer } from './global-spinner.styled';

const GlobalSpinner = (): ReactElement => {
  return (
    <LoaderContainer>
      <Box1 />
      <Box2 />
    </LoaderContainer>
  );
};

export default GlobalSpinner;
