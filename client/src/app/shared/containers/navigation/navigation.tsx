import { List } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import NavigationItem from './components/navigation-item/navigation-item';
import { NAVIGATION_MENU_CONFIGS } from './navigation.configs';
import {
  DrawerContainer,
  ExpandButton,
  NavigationLogoIconBig,
  NavigationLogoIconSmall,
  NavigationLogoSubTitle,
  NavigationLogoTitle,
} from './navigation.styled';

const Navigation = (): ReactElement => {
  const [isExpanded, setIsExpanded] = useState(true);

  function handleDrawerExpandAndCollapse(): void {
    setIsExpanded(!isExpanded);
  }

  return (
    <DrawerContainer open={isExpanded} variant='permanent'>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isExpanded ? (
          <>
            <NavigationLogoTitle variant='h3'>Listify</NavigationLogoTitle>
            <NavigationLogoIconSmall />
          </>
        ) : (
          <NavigationLogoIconBig />
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <NavigationLogoSubTitle isExpanded={isExpanded}>Your smart shopping list</NavigationLogoSubTitle>
      </Box>

      <ExpandButton ariaLabel='expand-btn' variant='raised' onClick={handleDrawerExpandAndCollapse}>
        {isExpanded ? <BsChevronLeft /> : <BsChevronRight />}
      </ExpandButton>

      <List sx={{ overflow: 'hidden' }}>
        {NAVIGATION_MENU_CONFIGS.map((item) => (
          <NavigationItem key={item.id} isExpanded={isExpanded} item={item} />
        ))}
      </List>
    </DrawerContainer>
  );
};

export default Navigation;
