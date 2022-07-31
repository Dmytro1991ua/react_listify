import { ReactElement, lazy } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import { AppRoutes } from './app.enums';
import { withSuspense } from './cdk/HOCs/with-suspense';
import history from './services/history.service';
import LayoutWithNavigationAndHeader from './shared/containers/layout-with-navigation-and-header/layout-with-navigation-and-header';

const ShoppingListsPageLazy = withSuspense(lazy(() => import('./modules/shopping-lists/shopping-lists')));
const SignInPageLazy = withSuspense(lazy(() => import('./modules/auth/pages/auth-sign-in-page')));
const SignUpPageLazy = withSuspense(lazy(() => import('./modules/auth/pages/auth-sign-up-page')));
const SignForgotPasswordPageLazy = withSuspense(lazy(() => import('./modules/auth/pages/auth-forgot-password-page')));
const ProfilePageLazy = withSuspense(lazy(() => import('./modules/profile/profile')));

const Routes = (): ReactElement => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from='/' to={AppRoutes.ShoppingLists} />
        <Route exact component={SignInPageLazy} path={AppRoutes.SignIn} />
        <Route exact component={SignUpPageLazy} path={AppRoutes.SignUp} />
        <Route exact component={SignForgotPasswordPageLazy} path={AppRoutes.ForgotPassword} />

        <Route exact path={[AppRoutes.ShoppingLists, AppRoutes.Profile]}>
          <LayoutWithNavigationAndHeader>
            <Route exact component={ShoppingListsPageLazy} path={AppRoutes.ShoppingLists} />
            <Route exact component={ProfilePageLazy} path={AppRoutes.Profile} />
          </LayoutWithNavigationAndHeader>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
