import { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';

import PrivateRoute from './private.route';
import { AppRoutes } from '../../../app.enums';
import { useAuthStore } from '../../../modules/auth/auth.store';
import GlobalSpinner from '../../components/global-spinner/global-spinner';

const UnauthorizedRoute = ({ children, ...props }: RouteProps): ReactElement => {
  const isUserLoading = useAuthStore((state) => state.userLoadingStatus) === 'loading';
  const isUserUnauthorized = !Boolean(useAuthStore((state) => state.user));

  if (isUserLoading) {
    return <GlobalSpinner />;
  }

  return (
    <PrivateRoute hasAccess={isUserUnauthorized} redirectUrl={AppRoutes.ShoppingLists} {...props}>
      {children}
    </PrivateRoute>
  );
};

export default UnauthorizedRoute;
