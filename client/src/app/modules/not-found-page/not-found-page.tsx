import { ReactElement } from 'react';

import history from './../../services/history.service';
import { NotFoundPageWrapper } from './not-found-page.styled';
import { AppRoutes } from '../../app.enums';
import Button from '../../shared/components/button/button';

const NotFoundPage = (): ReactElement => {
  function handlePageRedirect(): void {
    history.push(AppRoutes.ShoppingLists);
  }

  return (
    <NotFoundPageWrapper>
      <Button variant='primaryContained' onClick={handlePageRedirect}>
        Come Back Home
      </Button>
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
