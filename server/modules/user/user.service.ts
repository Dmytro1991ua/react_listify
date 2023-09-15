import { Response, Request } from "express";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { firebaseAuth } from "../../config/firebase.config";
import { Currencies } from "../../enums";
import { UserRequest } from "../../interfaces";
import { User } from "./user.schema";

type UpdateUserData = {
  name: string;
  photoURL: string;
  currency: string;
  calculateByQuantity: boolean;
};

type FilterOutExistingUser = {
  filterUsersById: {
    uid: string;
  };
  filterOptions: {
    upsert: boolean;
    new: boolean;
  };
};

export class UserService {
  async createNewUser(req: Request, res: Response, decodedIdToken: DecodedIdToken): Promise<void> {
    const newUser = this.createNewUserPayload(decodedIdToken);

    try {
      const savedUser = await newUser.save();
      res.status(200).send(savedUser);
    } catch (err) {
      res.status(400).send({ success: false, message: (err as Error).message });
    }
  }

  async updateNewUser(req: Request, res: Response, decodedIdToken: DecodedIdToken): Promise<void> {
    const { filterOptions, filterUsersById } = this.filterOutExistingUser(decodedIdToken);

    try {
      const updatedUser = await User.findOneAndUpdate(
        filterUsersById,
        {
          emailVerified: decodedIdToken.email_verified,
          authTime: decodedIdToken.auth_time,
          name: decodedIdToken.name,
          photoURL: decodedIdToken.picture,
        },
        filterOptions
      );

      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(400).send({ success: false, message: (err as Error).message });
    }
  }

  // @desc Create a current, registered Firebase user in MongoDb or update it
  // @route GET /api/users/me
  // @access Private
  async getUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
    if (!req.headers.authorization) {
      return res.status(500).send({ message: "Invalid token" });
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodedIdToken = await this.getDecodedItToken(token);

      if (!decodedIdToken) {
        return res.status(500).send({ success: false, message: "Unauthorized FirebaseUser" });
      }

      const userExists = await User.findOne({ uid: decodedIdToken.user_id });

      this.createOrUpdateUser(req, res, userExists, decodedIdToken);
    } catch (err) {
      return res.status(500).send({ success: false, message: (err as Error).message });
    }
  }

  // @desc Update user name and photoUrl inside profile page
  // @route POST /api/users/profile
  // @access Private
  async updateUserProfile(req: UserRequest, res: Response) {
    const user = req.currentUser;

    try {
      const update = this.updateUserProfileData(req);

      const filter = { uid: user && user.uid };
      const updatedDocument = await User.findOneAndUpdate(filter, update, { new: true });

      return res.status(200).send(updatedDocument);
    } catch (err) {
      res.status(404);
      throw new Error("User not found");
    }
  }

  private createOrUpdateUser(req: Request, res: Response, userExists: any, decodedIdToken: DecodedIdToken): void {
    if (!userExists) {
      this.createNewUser(req, res, decodedIdToken);
    } else {
      this.updateNewUser(req, res, decodedIdToken);
    }
  }

  private updateUserProfileData(req: Request): UpdateUserData {
    return {
      name: req.body.name,
      photoURL: req.body.photoURL,
      currency: req.body.currency,
      calculateByQuantity: req.body.calculateByQuantity,
    };
  }

  private createNewUserPayload(decodedIdToken: DecodedIdToken) {
    return new User({
      name: decodedIdToken.name ?? "",
      uid: decodedIdToken.user_id,
      email: decodedIdToken.email,
      photoURL: decodedIdToken.picture ?? "",
      emailVerified: decodedIdToken.email_verified,
      authTime: decodedIdToken.auth_time,
      currency: Currencies.Dollar,
      calculateByQuantity: false,
    });
  }

  private filterOutExistingUser(decodedIdToken: DecodedIdToken): FilterOutExistingUser {
    const filterUsersById = { uid: decodedIdToken.user_id };
    const filterOptions = {
      upsert: true,
      new: true,
    };

    return { filterUsersById, filterOptions };
  }

  private async getDecodedItToken(token: string): Promise<DecodedIdToken> {
    return firebaseAuth.verifyIdToken(token);
  }
}
