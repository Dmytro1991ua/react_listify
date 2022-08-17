import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { validateUserAction } from './auth.actions';

export type AuthStoreState = {
  user: CurrentUser | null;
  userLoadingStatus: LoadingStatus;
};

export type AuthStoreActions = {
  setUser: (user: CurrentUser | null) => void;
  setUserLoadingStatus: (loadingStatus: LoadingStatus) => void;
  validateUser: () => Promise<void>;
  reset: () => void;
};

const initialState: AuthStoreState = {
  user: null,
  userLoadingStatus: 'loading',
};

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  devtools(
    (set) => ({
      ...initialState,
      setUser: (payload) => {
        return set((state) => ({ ...state, user: payload }), false, 'setUser');
      },
      setUserLoadingStatus: (payload) =>
        set((state) => ({ ...state, userLoadingStatus: payload }), false, 'setUserLoadingStatus'),
      validateUser: validateUserAction,
      reset: () => set({ ...initialState, userLoadingStatus: 'idle' }, false, 'resetAuthStore'),
    }),
    { name: 'AuthStore' }
  )
);
