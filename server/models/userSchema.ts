import { model, Schema } from "mongoose";
import { Currencies } from "../enums";

import { FirebaseUser } from "./../interfaces";

const userSchema = new Schema<FirebaseUser>(
  {
    uid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    photoURL: { type: String, require: true },
    emailVerified: { type: Boolean, require: true },
    authTime: { type: String, require: true },
    currency: { type: String, enum: [Currencies], default: Currencies.Dollar },
    calculateByQuantity: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const User = model<FirebaseUser>("User", userSchema);
