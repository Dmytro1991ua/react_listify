import create from 'zustand';
import { devtools } from 'zustand/middleware';

type AuthStoreState = {
  user: CurrentUser | null;
  loadingStatus: LoadingStatus;
};

type AuthStoreActions = {
  setUser: (user: CurrentUser | null) => void;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
  reset: () => void;
};

const initialState: AuthStoreState = {
  user: null,
  loadingStatus: 'loading',
};

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  devtools((set) => ({
    ...initialState,
    setUser: (payload) => {
      return set(
        (state) => ({ ...state, user: payload, loadingStatus: payload ? 'idle' : 'failed' }),
        false,
        'setUser'
      );
    },
    setLoadingStatus: (payload) => set((state) => ({ ...state, loadingStatus: payload }), false, 'setLoadingStatus'),
    reset: () => set({ ...initialState, loadingStatus: 'idle' }, false, 'resetStore'),
  }))
);
