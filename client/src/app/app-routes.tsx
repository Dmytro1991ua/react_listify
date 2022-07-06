import { ReactElement } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import { AppRoutes } from './app.enums';
import AuthSignInPage from './modules/auth/pages/auth-sign-in-page';
import ShoppingLists from './modules/shopping-lists/shopping-lists';
import history from './services/history.service';
import LayoutWithNavigationAndHeader from './shared/containers/layout-with-navigation-and-header/layout-with-navigation-and-header';

const Routes = (): ReactElement => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from='/' to={AppRoutes.ShoppingLists} />
        <Route exact component={() => <AuthSignInPage />} path={AppRoutes.SignIn} />

        <Route exact path={[AppRoutes.ShoppingLists]}>
          <LayoutWithNavigationAndHeader>
            <Route exact component={() => <ShoppingLists />} path={AppRoutes.ShoppingLists} />
          </LayoutWithNavigationAndHeader>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
