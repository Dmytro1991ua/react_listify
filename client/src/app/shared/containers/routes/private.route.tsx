import { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { AppRoutes } from '../../../app.enums';

interface PrivateRouteProps extends RouteProps {
  hasAccess: boolean;
  redirectUrl: AppRoutes;
}

const PrivateRoute = ({ children, hasAccess, redirectUrl, ...props }: PrivateRouteProps): ReactElement => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        hasAccess ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectUrl,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
