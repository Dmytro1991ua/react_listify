import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { ReactElement, useCallback, useEffect } from 'react';

import Routes from './app-routes';
import { auth } from './configs/firebase';
import { authService } from './modules/auth/auth.service';
import { useAuthStore } from './modules/auth/auth.store';

const App = (): ReactElement => {
  const validateUser = useAuthStore((state) => state.validateUser);
  const setLoadingStatus = useAuthStore((state) => state.setLoadingStatus);

  const setCurrentUser = useCallback(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        getIdToken(user).then(async (token) => {
          authService.setToken(token);
        });

        await validateUser();
      }

      setLoadingStatus('idle');
    });

    return unsubscribe;
  }, [validateUser, setLoadingStatus]);

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  return <Routes />;
};

export default App;
