import {
  EmailAuthProvider,
  User,
  UserCredential,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getIdToken,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import firebase from 'firebase/compat';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import {
  FAILED_PASSWORD_CHANGED_MESSAGE,
  FAILED_PROFILE_UPDATE_MESSAGE,
  FAILED_RESET_PASSWORD_MESSAGE,
  FAILED_SIGN_IN_MESSAGE,
  FAILED_SIGN_IN_VIA_GOOGLE_MESSAGE,
  FAILED_SIGN_OUT_MESSAGE,
  FAILED_SIGN_UP_MESSAGE,
  SUCCESSFUL_FORGOT_PASSWORD_MESSAGE,
  SUCCESSFUL_PASSWORD_CHANGED_MESSAGE,
  SUCCESSFUL_PROFILE_UPDATE_MESSAGE,
  SUCCESSFUL_RESET_PASSWORD_MESSAGE,
  SUCCESSFUL_SIGN_IN_MESSAGE,
  SUCCESSFUL_SIGN_IN_VIA_GOOGLE_MESSAGE,
  SUCCESSFUL_SIGN_OUT_MESSAGE,
  SUCCESSFUL_SIGN_UP_MESSAGE,
} from './auth.constants';
import { useAuthStore } from './auth.store';
import { AppRoutes } from '../../app.enums';
import { CurrentUser, UpdateUserInformation } from '../../app.interfaces';
import { AXIOS_CONFIG } from '../../configs/axios';
import { auth, storage } from '../../configs/firebase';
import { appLifeCycleService } from '../../services/app-lifecycle.service';
import history from '../../services/history.service';
import { toastService } from '../../services/toast.service';

class AuthService {
  async signUp(email: string, password: string, name: string): Promise<void> {
    const updateUser = useAuthStore.getState().setUpdateUser;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser as User);
      await updateProfile(auth.currentUser as User, {
        displayName: name ?? auth.currentUser?.displayName,
        photoURL: null ?? auth.currentUser?.photoURL,
      });

      updateUser({
        name: auth.currentUser?.displayName ?? '',
        photoURL: auth.currentUser?.photoURL ?? '',
      });

      history.push(AppRoutes.ShoppingLists);
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

  async uploadFile(image: File, setProgress: (value: number) => void): Promise<void> {
    try {
      const currentUser = auth?.currentUser as User;
      const imageRef = ref(storage, `usersImages/${currentUser?.uid}/${image.name}`);
      const updateUserInfo = useAuthStore.getState().setUpdateUser;

      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percentUploaded = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          setProgress(percentUploaded);
        },
        (error) => {
          toastService.error((error as Error).message);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          updateUserInfo({ photoURL: url });
          setProgress(0);
        }
      );
    } catch (error) {
      toastService.error('Failed to upload image');
      throw new Error((error as Error).message);
    }
  }

  async updateUserData(userData: UpdateUserInformation): Promise<UpdateUserInformation | null> {
    try {
      const resp = await AXIOS_CONFIG.post('/api/users/profile', userData);

      if (!resp.data) {
        return null;
      }

      history.push(AppRoutes.ShoppingLists);
      toastService.success(SUCCESSFUL_PROFILE_UPDATE_MESSAGE);
      return resp.data;
    } catch (error) {
      toastService.error(FAILED_PROFILE_UPDATE_MESSAGE);
      throw new Error((error as Error).message);
    }
  }

  async userReauthentication(currentPassword: string): Promise<UserCredential> {
    try {
      const currentUser = auth?.currentUser as User;
      const userCredentials = EmailAuthProvider.credential(currentUser?.email ?? '', currentPassword);

      return reauthenticateWithCredential(currentUser, userCredentials);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async changeUserPassword(currentPassword: string, newPassword: string) {
    try {
      const currentUser = auth?.currentUser as User;
      const userReauthenticated = await this.userReauthentication(currentPassword);

      if (userReauthenticated) {
        await updatePassword(currentUser, newPassword);
      }

      history.push(AppRoutes.ShoppingLists);
      toastService.success(SUCCESSFUL_PASSWORD_CHANGED_MESSAGE);
    } catch (error) {
      toastService.error(FAILED_PASSWORD_CHANGED_MESSAGE);
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
