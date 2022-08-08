import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { validateUserAction } from './auth.actions';

type AuthStoreState = {
  user: CurrentUser | null;
  loadingStatus: LoadingStatus;
};

type AuthStoreActions = {
  setUser: (user: CurrentUser | null) => void;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
  reset: () => void;
  validateUser: () => Promise<void>;
};

const initialState: AuthStoreState = {
  user: null,
  loadingStatus: 'loading',
};

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  devtools((set) => ({
    ...initialState,
    setUser: (payload) => {
      return set((state) => ({ ...state, user: payload }), false, 'setUser');
    },
    setLoadingStatus: (payload) => set((state) => ({ ...state, loadingStatus: payload }), false, 'setLoadingStatus'),
    validateUser: validateUserAction,
    reset: () => set({ ...initialState, loadingStatus: 'idle' }, false, 'resetStore'),
  }))
);
