import { Router } from "express";
import { Routes } from "../../enums";
import { AuthMiddleware } from "../../middleware/authMiddleware";
import { ShoppingListDetailsService } from "./shopping-list-details.service";

class ShoppingListDetailsController {
  private shoppingListDetailsService: ShoppingListDetailsService;
  private authMiddleware: AuthMiddleware;

  public router: Router;

  constructor() {
    this.shoppingListDetailsService = new ShoppingListDetailsService();
    this.authMiddleware = new AuthMiddleware();
    this.router = Router();
    this.shoppingListDetailsRoutes();
  }

  shoppingListDetailsRoutes(): void {
    this.router.put(
      Routes.createProductItem,
      this.authMiddleware.checkAuth,
      (req, res) =>
        this.shoppingListDetailsService.createShoppingListDetailsItem(req, res)
    );
    this.router.delete(
      Routes.deleteProductItem,
      this.authMiddleware.checkAuth,
      (req, res) =>
        this.shoppingListDetailsService.deleteShoppingListDetailsItem(req, res)
    );
    this.router.put(
      Routes.editProductItem,
      this.authMiddleware.checkAuth,
      (req, res) =>
        this.shoppingListDetailsService.editShoppingListDetailsItem(req, res)
    );
    this.router.put(
      Routes.selectProductItem,
      this.authMiddleware.checkAuth,
      (req, res) =>
        this.shoppingListDetailsService.selectShoppingListDetailsItem(req, res)
    );
    this.router.put(
      Routes.selectAllProductItems,
      this.authMiddleware.checkAuth,
      (req, res) =>
        this.shoppingListDetailsService.selectAllShoppingListDetailsItems(
          req,
          res
        )
    );
    this.router.put(
      Routes.deleteAllProductItems,
      this.authMiddleware.checkAuth,
      (req, res) => this.shoppingListDetailsService.deleteAllProducts(req, res)
    );
  }
}

export const shoppingListDetailsController =
  new ShoppingListDetailsController();
