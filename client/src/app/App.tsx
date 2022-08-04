import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { ReactElement, useCallback, useEffect } from 'react';

import Routes from './app-routes';
import { auth } from './configs/firebase';
import { authService } from './modules/auth/auth.service';
import { useAuthStore } from './modules/auth/auth.store';

const App = (): ReactElement => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoadingStatus = useAuthStore((state) => state.setLoadingStatus);

  const setCurrentUser = useCallback(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoadingStatus('loading');

        getIdToken(user).then(async (token) => {
          authService.setToken(token);
        });

        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          emailVerified: user.emailVerified,
        });
        setLoadingStatus('idle');
      } else {
        setLoadingStatus('failed');
      }
    });

    return unsubscribe;
  }, [setLoadingStatus, setUser]);

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  return <Routes />;
};

export default App;
