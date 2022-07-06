import { ReactElement } from 'react';

import { DrawerContainer } from './navigation.styled';

const Navigation = (): ReactElement => {
  return (
    <DrawerContainer open={true} variant='permanent'>
      <p>Navigation</p>
    </DrawerContainer>
  );
};

export default Navigation;
