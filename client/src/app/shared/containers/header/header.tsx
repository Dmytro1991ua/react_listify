import { Toolbar, Typography } from '@mui/material';
import { ReactElement } from 'react';

import { HeaderWrapper } from './header.styled';

const Header = (): ReactElement => {
  return (
    <HeaderWrapper elevation={0}>
      <Toolbar>
        <Typography variant='h3'>Logo</Typography>
      </Toolbar>
    </HeaderWrapper>
  );
};

export default Header;
