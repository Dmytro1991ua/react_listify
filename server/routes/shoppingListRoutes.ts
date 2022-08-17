import express from "express";

import { createShoppingList, getAvailableShoppingLists } from "../controller/shoppingListsController";

import { checkAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(checkAuth, getAvailableShoppingLists).post(checkAuth, createShoppingList);

export default router;
