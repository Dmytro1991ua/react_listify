import express from "express";

import {
  createShoppingList,
  deleteShoppingList,
  getAvailableShoppingLists,
} from "../controller/shoppingListsController";
import {
  createShoppingListDetailsItem,
  deleteShoppingListDetailsItem,
} from "../controller/shoppingListsDetailsController";

import { checkAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.put("/:id/product-item", checkAuth, createShoppingListDetailsItem);
router.delete("/:id/delete-product-item", checkAuth, deleteShoppingListDetailsItem);

router.route("/").get(checkAuth, getAvailableShoppingLists).post(checkAuth, createShoppingList);
router.route("/:id").delete(checkAuth, deleteShoppingList);

export default router;
