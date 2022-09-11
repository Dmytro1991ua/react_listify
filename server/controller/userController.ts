import { Response, Request } from "express";

import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { firebaseAuth } from "../config/firebase.config";
import { Currencies } from "../enums";
import { User } from "../models/userSchema";

const createNewUser = async (req: Request, res: Response, decodedIdToken: DecodedIdToken): Promise<void> => {
  const newUser = new User({
    name: decodedIdToken.name,
    uid: decodedIdToken.user_id,
    email: decodedIdToken.email,
    photoURL: decodedIdToken.picture,
    emailVerified: decodedIdToken.email_verified,
    authTime: decodedIdToken.auth_time,
    currency: Currencies.Dollar,
    calculateByQuantity: false,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send({ success: false, message: (err as Error).message });
  }
};

const updateNewUser = async (req: Request, res: Response, decodedIdToken: DecodedIdToken): Promise<void> => {
  const filterUsers = { uid: decodedIdToken.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const updatedUser = await User.findOneAndUpdate(
      filterUsers,
      {
        name: decodedIdToken.name,
        emailVerified: decodedIdToken.email_verified,
        authTime: decodedIdToken.auth_time,
      },
      options
    );

    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send({ success: false, message: (err as Error).message });
  }
};

// @desc Create a current, registered Firebase user in MongoDb or update it
// @route GET /api/users/me
// @access Private
export const getUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid token" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedIdToken = await firebaseAuth.verifyIdToken(token);

    if (!decodedIdToken) {
      return res.status(500).send({ success: false, message: "Unauthorized FirebaseUser" });
    }

    const userExists = await User.findOne({ uid: decodedIdToken.user_id });

    if (!userExists) {
      createNewUser(req, res, decodedIdToken);
    } else {
      updateNewUser(req, res, decodedIdToken);
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: (err as Error).message });
  }
};
