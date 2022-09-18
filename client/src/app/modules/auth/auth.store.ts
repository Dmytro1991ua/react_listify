import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { AuthStoreActions, AuthStoreState } from './auth.interfaces';

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
      reset: () => set({ ...initialState, userLoadingStatus: 'idle' }, false, 'resetAuthStore'),
    }),
    { name: 'AuthStore' }
  )
);
