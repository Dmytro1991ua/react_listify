import { Router } from "express";
import { Routes } from "../../enums";

import { AuthMiddleware } from "../../middleware/authMiddleware";
import { ShoppingListsService } from "./shopping-lists.service";

class ShoppingListsController {
  private shoppingListsService: ShoppingListsService;
  private authMiddleware: AuthMiddleware;

  public router: Router;

  constructor() {
    this.shoppingListsService = new ShoppingListsService();
    this.authMiddleware = new AuthMiddleware();
    this.router = Router();
    this.shoppingListsRoutes();
  }

  shoppingListsRoutes(): void {
    this.router
      .route(Routes.rootRoute)
      .get(this.authMiddleware.checkAuth, (req, res) =>
        this.shoppingListsService.getAvailableShoppingLists(req, res)
      )
      .post(this.authMiddleware.checkAuth, (req, res) =>
        this.shoppingListsService.createShoppingList(req, res)
      );
    this.router
      .route(Routes.deleteShoppingList)
      .delete(this.authMiddleware.checkAuth, (req, res) =>
        this.shoppingListsService.deleteShoppingList(req, res)
      );
    this.router
      .route(Routes.editShoppingList)
      .put(this.authMiddleware.checkAuth, (req, res) =>
        this.shoppingListsService.editShoppingList(req, res)
    );
     this.router
       .route(Routes.addToFavorites)
       .put(this.authMiddleware.checkAuth, (req, res) =>
         this.shoppingListsService.addWorkoutToFavorites(req, res)
       );
  }
}

export const shoppingListsController = new ShoppingListsController();
