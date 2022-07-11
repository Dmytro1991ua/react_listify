import { List } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

import { NAVIGATION_MENU_CONFIGS } from './navigation.configs';
import {
  DrawerContainer,
  ExpandButton,
  ListItem,
  ListItemLabel,
  NavigationLogoIconBig,
  NavigationLogoIconSmall,
  NavigationLogoSubTitle,
  NavigationLogoTitle,
} from './navigation.styled';

const Navigation = (): ReactElement => {
  const location = useLocation();

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

      <ExpandButton variant='raised' onClick={handleDrawerExpandAndCollapse}>
        {isExpanded ? <BsChevronLeft /> : <BsChevronRight />}
      </ExpandButton>

      <List sx={{ overflow: 'hidden' }}>
        {NAVIGATION_MENU_CONFIGS.map((item) => (
          <ListItem
            key={item.id}
            isActive={location.pathname === item.url}
            isExpanded={isExpanded}
            onClick={item.onClick}
          >
            {item.icon}
            <ListItemLabel isExpanded={isExpanded}>{item.label}</ListItemLabel>
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  );
};

export default Navigation;
