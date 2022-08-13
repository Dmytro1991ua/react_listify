import { ReactElement, lazy } from 'react';
import { Redirect, Router, Switch } from 'react-router-dom';

import { AppRoutes } from './app.enums';
import { withSuspense } from './cdk/HOCs/with-suspense';
import history from './services/history.service';
import LayoutWithNavigationAndHeader from './shared/containers/layout-with-navigation-and-header/layout-with-navigation-and-header';
import AuthorizedRoute from './shared/containers/routes/authorized-route';
import UnauthorizedRoute from './shared/containers/routes/unauthorized-route';

const ShoppingListsPageLazy = withSuspense(lazy(() => import('./modules/shopping-lists/shopping-lists')));
const ShoppingListDetailsPageLazy = withSuspense(
  lazy(() => import('./modules/shopping-list-details/shopping-list-details'))
);
const SignInPageLazy = withSuspense(lazy(() => import('./modules/auth/pages/auth-sign-in-page')));
const SignUpPageLazy = withSuspense(lazy(() => import('./modules/auth/pages/auth-sign-up-page')));
const ForgotPasswordPageLazy = withSuspense(lazy(() => import('./modules/auth/pages/auth-forgot-password-page')));
const ResetPasswordPageLazy = withSuspense(lazy(() => import('./modules/auth/pages/auth-reset-password-page')));
const ProfilePageLazy = withSuspense(lazy(() => import('./modules/profile/profile')));
const NotFoundPageLazy = withSuspense(lazy(() => import('./modules/not-found-page/not-found-page')));

const Routes = (): ReactElement => {
  return (
    <Router history={history}>
      <Switch>
        <UnauthorizedRoute exact path={AppRoutes.SignIn}>
          <SignInPageLazy />
        </UnauthorizedRoute>
        <UnauthorizedRoute exact path={AppRoutes.SignUp}>
          <SignUpPageLazy />
        </UnauthorizedRoute>
        <UnauthorizedRoute exact path={AppRoutes.ForgotPassword}>
          <ForgotPasswordPageLazy />
        </UnauthorizedRoute>
        <UnauthorizedRoute exact path={AppRoutes.ResetPassword}>
          <ResetPasswordPageLazy />
        </UnauthorizedRoute>

        <AuthorizedRoute exact path={[AppRoutes.ShoppingLists, AppRoutes.Profile, AppRoutes.ShoppingList]}>
          <LayoutWithNavigationAndHeader>
            <AuthorizedRoute exact path={AppRoutes.ShoppingLists}>
              <ShoppingListsPageLazy />
            </AuthorizedRoute>
            <AuthorizedRoute exact path={AppRoutes.ShoppingList}>
              <ShoppingListDetailsPageLazy />
            </AuthorizedRoute>
            <AuthorizedRoute exact path={AppRoutes.Profile}>
              <ProfilePageLazy />
            </AuthorizedRoute>
          </LayoutWithNavigationAndHeader>
        </AuthorizedRoute>

        <AuthorizedRoute>
          <Redirect exact from='/' to={AppRoutes.ShoppingLists} />
        </AuthorizedRoute>

        <AuthorizedRoute exact path={AppRoutes.NotFound}>
          <NotFoundPageLazy />
        </AuthorizedRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
