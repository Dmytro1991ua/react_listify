import express from "express";
import { ServiceAccount } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export type Port = string | number;
export interface FirebaseServiceAccount extends ServiceAccount {
  privateKeyId?: string;
  clientId?: string;
  authUri?: string;
  tokenUri?: string;
  authProviderX509CertUrl?: string;
  clientX509CertUrl?: string;
}

export interface FirebaseUser {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
  authTime: string;
}

export interface UserRequest extends express.Request {
  currentUser?: DecodedIdToken;
}
