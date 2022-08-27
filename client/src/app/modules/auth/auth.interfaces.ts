import { CurrentUser, LoadingStatus } from '../../app.interfaces';

export interface SignInFormInitialValues {
  email: string;
  password: string;
}

export interface SignUpFormInitialValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormInitialValues {
  email: string;
}

export interface ResetPasswordFormInitialValues {
  newPassword: string;
}

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
