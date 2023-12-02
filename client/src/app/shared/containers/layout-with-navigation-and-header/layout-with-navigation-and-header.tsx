import { ReactElement, ReactNode } from 'react';

import { HeaderSpacer, LayoutContainer, MainContent } from './layout-with-navigation-and-header.styled';
import Header from '../header/header';
import Navigation from '../navigation/navigation';

interface LayoutWithNavigationAndHeaderProps {
  children?: ReactNode;
}

const LayoutWithNavigationAndHeader = ({ children }: LayoutWithNavigationAndHeaderProps): ReactElement => {
  return (
    <LayoutContainer>
      <Header />
      <Navigation />
      <MainContent>
        {/* theme.mixins.toolbar => allows adding add a needed space under App Bar MUI component so the main content is not hidden beneath it */}
        <HeaderSpacer />
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default LayoutWithNavigationAndHeader;
