import { model, Schema } from "mongoose";

import { FirebaseUser } from "./../interfaces";

const userSchema = new Schema<FirebaseUser>(
  {
    uid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    photoURL: { type: String, require: true },
    emailVerified: { type: Boolean, require: true },
    authTime: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<FirebaseUser>("User", userSchema);
