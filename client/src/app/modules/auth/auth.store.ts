import { produce } from 'immer';
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
      setUpdateUser: (payload) => {
        return set(
          produce((state) => ({ user: { ...state.user, ...payload } })),
          false,
          'setUpdateUser'
        );
      },
      reset: () => set({ ...initialState, userLoadingStatus: 'idle' }, false, 'resetAuthStore'),
    }),
    { name: 'AuthStore' }
  )
);
