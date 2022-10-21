import { act, renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { authService } from './../auth.service';
import { useAuth } from './useAuth';

const commonProps = {
  setStatus: vi.fn(),
  setErrors: vi.fn(),
  setSubmitting: vi.fn(),
  setTouched: vi.fn(),
  setValues: vi.fn(),
  setFieldValue: vi.fn(),
  setFieldError: vi.fn(),
  setFieldTouched: vi.fn(),
  validateForm: vi.fn(),
  validateField: vi.fn(),
  resetForm: vi.fn(),
  submitForm: vi.fn(),
  setFormikState: vi.fn(),
};

describe('useAuth', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const hook = renderHook(() => useAuth(), {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });

  it('should return loading param with false', () => {
    const { result } = hook;

    expect(result.current.isSignInViaGoogleLoading).toBe(false);
  });

  it('should call onSignInFormSubmit function ', async () => {
    const { result } = hook;

    const onSignInFormSubmitSpy = vi.spyOn(authService, 'signIn');

    const defaultProps = {
      value: { email: 'foo@example.com', password: '12345678' },
      actions: commonProps,
    };

    await act(async () => result.current.onSignInFormSubmit(defaultProps.value, defaultProps.actions));

    expect(onSignInFormSubmitSpy).toHaveBeenCalled();
    expect(defaultProps.actions.resetForm).toHaveBeenCalled();
  });

  it('should call onSignUpFormSubmit function ', async () => {
    const { result } = hook;

    const onSignUpFormSubmitSpy = vi.spyOn(authService, 'signUp');

    const defaultProps = {
      value: { name: 'Alex Smith', email: 'foo@example.com', password: '12345678', confirmPassword: '12345678' },
      actions: commonProps,
    };

    await act(async () => result.current.onSignUpFormSubmit(defaultProps.value, defaultProps.actions));

    expect(onSignUpFormSubmitSpy).toHaveBeenCalled();
    expect(defaultProps.actions.resetForm).toHaveBeenCalled();
  });

  it('should call onForgotPasswordFormSubmit function ', async () => {
    const { result } = hook;

    const onForgotPasswordFormSubmitSpy = vi.spyOn(authService, 'forgotPassword');

    const defaultProps = {
      value: { email: 'test@gmail.com' },
      actions: commonProps,
    };

    await act(async () => result.current.onForgotPasswordFormSubmit(defaultProps.value, defaultProps.actions));

    expect(onForgotPasswordFormSubmitSpy).toHaveBeenCalled();
    expect(defaultProps.actions.resetForm).toHaveBeenCalled();
  });

  it('should call onResetPasswordFormSubmit function ', async () => {
    const { result } = hook;

    const onResetPasswordFormSubmitSpy = vi.spyOn(authService, 'resetPassword');

    const defaultProps = {
      value: { newPassword: '93799992' },
      actions: commonProps,
    };

    await act(async () => result.current.onResetPasswordFormSubmit(defaultProps.value, defaultProps.actions));

    expect(onResetPasswordFormSubmitSpy).toHaveBeenCalled();
    expect(defaultProps.actions.resetForm).toHaveBeenCalled();
  });

  it('should call onFormSubmitViaGoogle function ', async () => {
    const { result } = hook;

    const onFormSubmitViaGoogleSpy = vi.spyOn(authService, 'signInViaGoogle');

    await act(async () => result.current.onFormSubmitViaGoogle());

    expect(onFormSubmitViaGoogleSpy).toHaveBeenCalled();
  });
});
