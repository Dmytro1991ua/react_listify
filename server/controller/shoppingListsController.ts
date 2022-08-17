import { Response } from "express";

import { UserRequest } from "../interfaces";
import { ShoppingList } from "../models/shoppingListSchema";

// @dec  Get all shopping lists
// @route  GET /api/shopping-lists
// @access Private
export const getAvailableShoppingLists = async (req: UserRequest, res: Response) => {
  const user = req.currentUser;

  try {
    if (user) {
      const shoppingLists = await ShoppingList.find({ user: user.uid });

      res.status(200).json(shoppingLists);
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
};

// @dec  Create new shopping list
// @route  POST /api/shopping-lists
// @access Private
export const createShoppingList = async (req: UserRequest, res: Response) => {
  const shoppingList = req.body;
  const user = req.currentUser;

  try {
    if (user) {
      const newShoppingList = new ShoppingList({ ...shoppingList, user: user.uid });

      await newShoppingList.save();
      res.status(200).json(newShoppingList);
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    res.status(409);
    throw new Error((err as Error).message);
  }
};
