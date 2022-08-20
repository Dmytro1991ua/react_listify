import { UserRequest } from "../interfaces";
import { ShoppingListDetails } from "../models/shoppingListDetailsSchema";
import { Response } from "express";
import { ShoppingList } from "./../models/shoppingListSchema";

// @dec Create a new shopping list details item(product)
// @route  POST /api/shopping-lists/:id/item
// @access Private
export const createShoppingListDetailsItem = async (req: UserRequest, res: Response) => {
  const { id: _id } = req.params;
  const shoppingListDetailsItem = req.body;

  const user = req.currentUser;

  try {
    if (user) {
      const newShoppingListDetailsItem = new ShoppingListDetails({ ...shoppingListDetailsItem, user: user.uid });

      const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
        { _id },
        { $addToSet: { shoppingListItems: newShoppingListDetailsItem } },
        { new: true }
      );

      res.status(200).json(updatedShoppingList);
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    res.status(409);
    throw new Error((err as Error).message);
  }
};
