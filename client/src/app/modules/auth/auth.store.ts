import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthStoreState {
  user: CurrentUser | null;
  loadingStatus: LoadingStatus;
  setUser: (user: CurrentUser | null) => void;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
}

export const useAuthStore = create<AuthStoreState>()(
  devtools((set) => ({
    user: null,
    loadingStatus: 'loading',
    setUser: (payload) => set((state) => ({ ...state, user: payload }), false, 'setUser'),
    setLoadingStatus: (payload) => set((state) => ({ ...state, loadingStatus: payload }), false, 'setLoadingStatus'),
  }))
);
