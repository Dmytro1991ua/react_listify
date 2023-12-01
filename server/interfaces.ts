import express from "express";
import { ServiceAccount } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Currencies } from "./enums";

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
  currency?: Currencies;
  calculateByQuantity?: false;
}

export interface UserRequest extends express.Request {
  currentUser?: DecodedIdToken;
}

export interface CategoryItem {
  iconName: string;
  isCustom: boolean;
  label: string;
  value: string;
}

export interface ShoppingListDetailsItem {
  name: string;
  category: CategoryItem;
  quantity: number;
  units: string;
  price: number;
  isChecked: boolean;
}

export interface ShoppingListItem {
  user: string;
  name: string;
  currency: string;
  shoppingListItems: ShoppingListDetailsItem[];
  isFavorite: boolean;
}
