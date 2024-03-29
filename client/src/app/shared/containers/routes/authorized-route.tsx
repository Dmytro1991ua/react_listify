import { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';

import PrivateRoute from './private.route';
import { AppRoutes } from '../../../app.enums';
import { useAuthStore } from '../../../modules/auth/auth.store';
import GlobalSpinner from '../../components/global-spinner/global-spinner';

const AuthorizedRoute = ({ children, ...props }: RouteProps): ReactElement => {
  const isUserLoading = useAuthStore((state) => state.userLoadingStatus) === 'loading';
  const isUserAuthenticated = Boolean(useAuthStore((state) => state.user));

  if (isUserLoading) {
    return <GlobalSpinner />;
  }

  return (
    <PrivateRoute hasAccess={isUserAuthenticated} redirectUrl={AppRoutes.SignIn} {...props}>
      {children}
    </PrivateRoute>
  );
};

export default AuthorizedRoute;
