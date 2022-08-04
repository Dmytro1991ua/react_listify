declare interface CurrentUser {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber?: string | null;
  emailVerified?: boolean;
}

declare type LoadingStatus = 'loading' | 'idle' | 'failed';
