import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthStoreState {
  user: CurrentUser | null;
  loadingStatus: LoadingStatus;
  setUser: (payload: CurrentUser | null) => void;
  setLoadingStatus: (payload: LoadingStatus) => void;
}

export const useAuthStore = create<AuthStoreState>()(
  devtools((set) => ({
    user: null,
    loadingStatus: 'loading',
    setUser: (payload) => set(() => ({ user: payload }), false, 'setUser'),
    setLoadingStatus: (payload) => set(() => ({ loadingStatus: payload }), false, 'setLoadingSTatus'),
  }))
);
