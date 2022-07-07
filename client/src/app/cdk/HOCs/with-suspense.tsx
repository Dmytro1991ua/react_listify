import { ComponentType, FC, LazyExoticComponent, ReactElement, Suspense } from 'react';

import GlobalSpinner from '../../shared/components/global-spinner/global-spinner';

interface WithSuspenseProps {
  Component?: LazyExoticComponent<ComponentType>;
  loader?: ReactElement;
}

const DEFAULT_LOADER = <GlobalSpinner />;

/**
 * This HOC intended to wrap components that you want to lazy load {@link https://reactjs.org/docs/code-splitting.html}
 *
 * Usage example:
 *
 * const componentToBeLazyLoaded = withSuspense(lazy(() => import(pathToComponent)));
 *
 * @param {React.LazyExoticComponent<React.FC>} Component Component that you want to exclude from bundle and lazy load on demand
 * @param {React.ReactElement} Loader Component that will be displayed till component load
 */

export const withSuspense =
  (Component: LazyExoticComponent<FC>, loader: ReactElement | undefined = DEFAULT_LOADER): FC<WithSuspenseProps> =>
  // eslint-disable-next-line react/display-name
  (props): ReactElement => {
    return (
      <Suspense fallback={loader}>
        <Component {...props} />
      </Suspense>
    );
  };
