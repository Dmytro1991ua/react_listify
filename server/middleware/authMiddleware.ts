import { NextFunction, Response } from "express";

import { firebaseAuth } from "../config/firebase.config";
import { UserRequest } from "../interfaces";

export class AuthMiddleware {
  async checkAuth(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
    let token;

    if (req?.headers?.authorization && req?.headers?.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decodedIdToken = await firebaseAuth.verifyIdToken(token);

        req.currentUser = decodedIdToken;

        next();
      } catch (err) {
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
}
