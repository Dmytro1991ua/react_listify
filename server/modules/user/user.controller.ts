import { Router } from "express";
import { Routes } from "../../enums";
import { UserService } from "./user.service";

import { AuthMiddleware } from "../../middleware/authMiddleware";
class UserController {
  private userService: UserService;
  private authMiddleware: AuthMiddleware;

  public router: Router;

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    this.userService = new UserService();
    this.router = Router();
    this.userRoutes();
  }

  userRoutes(): void {
    this.router.get(Routes.getUser, this.authMiddleware.checkAuth, (req, res) => this.userService.getUser(req, res));
    this.router.post(Routes.updateUserProfile, this.authMiddleware.checkAuth, (req, res) =>
      this.userService.updateUserProfile(req, res)
    );
  }
}

export const userController = new UserController();
