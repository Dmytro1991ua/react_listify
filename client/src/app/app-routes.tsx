import { ReactElement, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import { AppRoutes } from './app.enums';
import { withSuspense } from './cdk/HOCs/with-suspense';
import history from './services/history.service';
import LayoutWithNavigationAndHeader from './shared/containers/layout-with-navigation-and-header/layout-with-navigation-and-header';

const ShoppingListsPageLazy = withSuspense(lazy(() => import('./modules/shopping-lists/shopping-lists')));
const SignInPageLazy = withSuspense(lazy(() => import('./modules/auth/pages/auth-sign-in-page')));

const Routes = (): ReactElement => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from='/' to={AppRoutes.ShoppingLists} />
        <Route exact component={SignInPageLazy} path={AppRoutes.SignIn} />

        <Route exact path={[AppRoutes.ShoppingLists]}>
          <LayoutWithNavigationAndHeader>
            <Route exact component={ShoppingListsPageLazy} path={AppRoutes.ShoppingLists} />
          </LayoutWithNavigationAndHeader>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
