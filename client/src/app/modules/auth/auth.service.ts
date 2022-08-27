import {
  User,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getIdToken,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import firebase from 'firebase/compat';

import { AppRoutes } from '../../app.enums';
import { CurrentUser } from '../../app.interfaces';
import { AXIOS_CONFIG } from '../../configs/axios';
import { auth } from '../../configs/firebase';
import { appLifeCycleService } from '../../services/app-lifecycle.service';
import history from '../../services/history.service';
import { toastService } from '../../services/toast.service';
import {
  FAILED_RESET_PASSWORD_MESSAGE,
  FAILED_SIGN_IN_MESSAGE,
  FAILED_SIGN_IN_VIA_GOOGLE_MESSAGE,
  FAILED_SIGN_OUT_MESSAGE,
  FAILED_SIGN_UP_MESSAGE,
  SUCCESSFUL_FORGOT_PASSWORD_MESSAGE,
  SUCCESSFUL_RESET_PASSWORD_MESSAGE,
  SUCCESSFUL_SIGN_IN_MESSAGE,
  SUCCESSFUL_SIGN_IN_VIA_GOOGLE_MESSAGE,
  SUCCESSFUL_SIGN_OUT_MESSAGE,
  SUCCESSFUL_SIGN_UP_MESSAGE,
} from './auth.contants';

class AuthService {
  async signUp(email: string, password: string, name?: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser as User);
      await updateProfile(auth.currentUser as User, {
        displayName: name,
      });

      history.push(AppRoutes.SignIn);
      toastService.success(SUCCESSFUL_SIGN_UP_MESSAGE);
    } catch (error) {
      toastService.error(`${FAILED_SIGN_UP_MESSAGE}: ${(error as Error).message}`);
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      const token = await getIdToken(userData?.user);

      if (token) {
        this.setToken(token);
      }

      history.push(AppRoutes.ShoppingLists);
      toastService.success(SUCCESSFUL_SIGN_IN_MESSAGE);
    } catch (error) {
      console.log(error);
      toastService.error(`${FAILED_SIGN_IN_MESSAGE}: ${(error as Error).message}`);
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth.signOut();
      this.removeToken();
      appLifeCycleService.clearAppDataStorage();
      toastService.success(SUCCESSFUL_SIGN_OUT_MESSAGE);
      history.push(AppRoutes.SignIn);
    } catch (error) {
      toastService.error(`${FAILED_SIGN_OUT_MESSAGE}: ${(error as Error).message}`);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
      toastService.success(SUCCESSFUL_FORGOT_PASSWORD_MESSAGE);
    } catch (error) {
      toastService.error((error as Error).message);
    }
  }

  async resetPassword(oobCode: string, newPassword: string): Promise<void> {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      history.push(AppRoutes.SignIn);
      toastService.success(SUCCESSFUL_RESET_PASSWORD_MESSAGE);
    } catch (error) {
      toastService.error(`${FAILED_RESET_PASSWORD_MESSAGE}: ${(error as Error).message}`);
    }
  }

  async signInViaGoogle(): Promise<void> {
    try {
      const userData = await signInWithPopup(auth, new firebase.auth.GoogleAuthProvider());
      const token = await getIdToken(userData?.user);

      if (token) {
        this.setToken(token);
      }

      history.push(AppRoutes.ShoppingLists);
      toastService.success(SUCCESSFUL_SIGN_IN_VIA_GOOGLE_MESSAGE);
    } catch (error) {
      toastService.error(`${FAILED_SIGN_IN_VIA_GOOGLE_MESSAGE} ${(error as Error).message}`);
    }
  }

  async validateUser(): Promise<CurrentUser | null> {
    try {
      const resp = await AXIOS_CONFIG.get('/api/users/me');

      if (!resp.data) {
        return null;
      }

      return resp.data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  getToken(): string {
    return localStorage.getItem('listify-app-token') || '';
  }

  setToken(token: string): void {
    localStorage.setItem('listify-app-token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('listify-app-token');
  }
}

export const authService = new AuthService();
