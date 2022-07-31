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
